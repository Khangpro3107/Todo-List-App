import axios from "axios";
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Header from "./components/Header";
import NewItem from "./components/NewItem";
import ItemDetail from "./components/ItemDetail";
import Login from "./components/Login";
import Register from "./components/Register";
import Error from "./components/Error";
import PrivateRoutes from "./components/PrivateRoutes";
import ListDisplay from "./components/ListDisplay";

function App() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [deadline, setDeadline] = useState(Date.now());
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await axios
        .get(`/todos`)
        .then((res) => {
          const rawData = res.data.filter((item) => {
            return item.owner === username;
          });
          const newData = rawData.sort((a, b) => {
            return Date.parse(a.deadline) < Date.parse(b.deadline) ? -1 : 1;
          });
          const finalData = newData.filter((item) => !item.completed);
          const filteredData = newData.filter((item) => item.completed);
          setData(finalData.concat(filteredData)); // no need to take all fields from backend (*)
        })
        .catch((err) => console.log(err.message));
      setIsLoading(false);
    };

    const fetchUser = () => {
      setIsLoading(true);
      setUsername(localStorage.getItem("username"));
      setIsLoading(false);
    };

    fetchUser();
    fetchData();
  }, [data.length, username]);

  const handleDelete = async (item) => {
    setIsLoading(true);
    const newList = data.filter((_item) => _item._id !== item._id);
    const sortedList = newList.sort((a, b) => {
      return Date.parse(a.deadline) < Date.parse(b.deadline) ? -1 : 1;
    });
    const notCompletedList = sortedList.filter((item) => !item.completed);
    const completedList = sortedList.filter((item) => item.completed);
    await axios
      .delete(`/todo/${item._id}`)
      .then((res) => setData(notCompletedList.concat(completedList)))
      .catch((err) => console.log(err.message));
    setIsLoading(false);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const newTask = {
      name: name,
      desc: desc,
      deadline: deadline,
      owner: username,
    };
    const newList = [...data, newTask]; // (*) data has a lotta fields, unlike newTask with just 3
    const sortedList = newList.sort((a, b) => {
      return Date.parse(a.deadline) < Date.parse(b.deadline) ? -1 : 1;
    });
    const notCompletedList = sortedList.filter((item) => !item.completed);
    const completedList = sortedList.filter((item) => item.completed);
    await axios
      .post(`/todo/new`, newTask)
      .then((res) => {
        setData(notCompletedList.concat(completedList));
      })
      .catch((err) => console.log(err.message));
    setName("");
    setDesc("");
    setIsLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    alert("Logout successful!");
    navigate("/login");
    return window.location.reload();
  };

  return (
    <div className="container-fluid vh-100 bg-dark m-0 p-0">
      <div className="col-1"></div>
      <div className="container col-10 bg-light vh-100">
        <div className="d-flex justify-content-between mb-3 w-100 m-auto align-items-center">
          <Header username={username} />
          {username ? (
            <div className="d-flex align-items-center">
              <h6>Hello, {username}</h6>
              <button
                className="btn btn-outline-danger ms-3"
                onClick={() => {
                  handleLogout();
                }}
              >
                <i className="fas fa-sign-out-alt me-2" />
                Logout
              </button>
            </div>
          ) : null}
        </div>
        <Routes>
          <Route element={<PrivateRoutes username={username} />}>
            <Route
              path="/"
              element={
                <>
                  <div className="d-flex flex-column align-items-center">
                    <NewItem
                      name={name}
                      setName={setName}
                      desc={desc}
                      setDesc={setDesc}
                      handleSubmit={handleSubmit}
                      deadline={deadline}
                      setDeadline={setDeadline}
                    />
                    <ListDisplay
                      isLoading={isLoading}
                      data={data}
                      setData={setData}
                      username={username}
                      handleDelete={handleDelete}
                    />
                  </div>
                </>
              }
            />
          </Route>
          <Route
            path="/todo/:id"
            element={username ? <ItemDetail data={data} setData={setData} /> : <Login />}
          />
          <Route
            path="/login"
            element={username ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/register"
            element={username ? <Navigate to="/" /> : <Register />}
          />
          <Route path="/*" element={<Error />} />
        </Routes>
      </div>
      <div className="col-1"></div>
      <footer className="bg-secondary text-center text-light h6 p-2">
        HCMUT, DBS Seminar, semester 221
      </footer>
    </div>
  );
}

export default App;
