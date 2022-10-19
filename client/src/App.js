import axios from "axios";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import List from "./components/List";
import NewItem from "./components/NewItem";
import { Routes, Route } from "react-router-dom";
import ItemDetail from "./components/ItemDetail";

const URL = "http://localhost:3001/";

function App() {
  const [data, setData] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [deadline, setDeadline] = useState(Date.now());
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await axios
        .get(`${URL}todos`)
        .then((res) => {
          const newData = res.data.sort((a, b) => {
            return Date.parse(a.deadline) < Date.parse(b.deadline) ? -1 : 1;
          });
          const finalData = newData.filter((item) => !item.completed);
          const filteredData = newData.filter((item) => item.completed);
          setData(finalData.concat(filteredData));
        })
        .catch((err) => console.log(err.message));
      setIsLoading(false);
    };
    fetchData();
  }, [data.length]);

  const handleDelete = async (item) => {
    setIsLoading(true);
    const newList = data.filter((_item) => _item._id !== item._id);
    const sortedList = newList.sort((a, b) => {
      return Date.parse(a.deadline) < Date.parse(b.deadline) ? -1 : 1;
    });
    const notCompletedList = sortedList.filter((item) => !item.completed);
    const completedList = sortedList.filter((item) => item.completed);
    await axios
      .delete(`${URL}todo/${item._id}`)
      .then((res) => setData(notCompletedList.concat(completedList)))
      .catch((err) => console.log(err.message));
    setIsLoading(false);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const newTask = {
      text: newItem,
      deadline: deadline,
    };
    const newList = [...data, newTask];
    const sortedList = newList.sort((a, b) => {
      return Date.parse(a.deadline) < Date.parse(b.deadline) ? -1 : 1;
    });
    const notCompletedList = sortedList.filter((item) => !item.completed);
    const completedList = sortedList.filter((item) => item.completed);
    await axios
      .post(`${URL}todo/new`, newTask)
      .then((res) => {
        setData(notCompletedList.concat(completedList));
      })
      .catch((err) => console.log(err.message));
    setNewItem("");
    setIsLoading(false);
  };

  return (
    <div className="container vh-100">
      <div className="row">
        <div className="col-1"></div>
        <div className="container col-10 bg-light vh-100">
          <div className="row mb-3">
            <Header />
          </div>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <NewItem
                    newItem={newItem}
                    setNewItem={setNewItem}
                    handleSubmit={handleSubmit}
                    deadline={deadline}
                    setDeadline={setDeadline}
                  />
                  {!isLoading ? (
                    data.length ? (
                      <List
                        data={data}
                        setData={setData}
                        handleDelete={handleDelete}
                      />
                    ) : (
                      <h6 className="text-center">
                        The list is currently empty. Enter some using the form
                        below.
                      </h6>
                    )
                  ) : (
                    <h1 className="text-center">
                      Loading...
                      <div className="spinner-border text-dark" role="status"></div>
                    </h1>
                  )}
                </>
              }
            />
            <Route path="/todo/:id" element={<ItemDetail />} />
          </Routes>
        </div>
        <div className="col-1"></div>
      </div>
    </div>
  );
}

export default App;
