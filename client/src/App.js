import axios from "axios";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import List from "./components/List";
import NewItem from "./components/NewItem";

const URL = "http://localhost:3001/";

function App() {
  const [data, setData] = useState([]);
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    axios
      .get(`${URL}todos`)
      .then((res) => {
        const newData = res.data.sort((a, b) => {
          return a.text < b.text ? -1 : 1;
        });
        setData(newData);
      })
      .catch((err) => console.log(err.message));
  }, []);

  // const handleToggle = (item) => {
  //   const filteredList = data.filter((_item) => item._id !== _item._id);
  //   const newList = [...filteredList, { ...item, completed: !item.completed }];
  //   console.log(newList);
  //   axios
  //     .patch(`${URL}todo/${item._id}`, { completed: !item.completed })
  //     .then((res) => {
  //       setData(
  //         newList.sort((a, b) => {
  //           return a.text < b.text ? -1 : 1;
  //         })
  //       );
  //     })
  //     .catch((err) => console.log(err.message));
  // };

  // const handleUpdate = (item) => {
  //   const filteredList = data.filter((_item) => item._id !== _item._id);
  //   const newList = [...filteredList, { ...item, completed: !item.completed }];
  //   console.log(newList);
  //   axios
  //     .patch(`${URL}todo/${item._id}`, { text:  })
  //     .then((res) => {
  //       setData(
  //         newList.sort((a, b) => {
  //           return a.text < b.text ? -1 : 1;
  //         })
  //       );
  //     })
  //     .catch((err) => console.log(err.message));
  // };

  const handleDelete = (item) => {
    const newList = data.filter((_item) => _item._id !== item._id);
    axios
      .delete(`${URL}todo/${item._id}`)
      .then((res) =>
        setData(
          newList.sort((a, b) => {
            return a.text < b.text ? -1 : 1;
          })
        )
      )
      .catch((err) => console.log(err.message));
  };

  const handleSubmit = () => {
    const newTask = {
      text: newItem,
    };
    const newList = [...data, newTask];
    console.log(newTask, newList);
    axios
      .post(`${URL}todo/new`, newTask)
      .then((res) => {
        setData(
          [...data, res.data].sort((a, b) => {
            return a.text < b.text ? -1 : 1;
          })
        );
      })
      .catch((err) => console.log(err.message));
    setNewItem("");
    console.log(data);
  };

  return (
    <div className="container vh-100">
      <div className="row">
        <div className="col-2"></div>
        <div className="container col-8 bg-light vh-100">
          <div className="row mb-3">
            <Header />
          </div>
          <NewItem
            newItem={newItem}
            setNewItem={setNewItem}
            handleSubmit={handleSubmit}
          />
          <List data={data} setData={setData} handleDelete={handleDelete} />
        </div>
        <div className="col-2"></div>
      </div>
    </div>
  );
}

export default App;
