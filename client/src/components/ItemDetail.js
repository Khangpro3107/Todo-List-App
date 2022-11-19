import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EditPanel from "./EditPanel";

//const URL = process.env.REACT_APP_BACKEND_URL;
const URL = "https://todolist-api-gwhc.onrender.com/";

const ItemDetail = ({ data, setData }) => {
  const id = useParams().id;
  const navigate = useNavigate();

  const [item, setItem] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // await axios.get(`${URL}todo/${id}`).then((res) => {
        //   if (res.data) setItem(res.data);
        // });
        const res = await axios.get(`${URL}todo/${id}`);
        setItem(res.data);
      } catch (error) {
        setError(error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [id]);

  const main = (
    <>
      {/* <h1>{item.name}, {(new Date(item.deadline)).toString()}, {(new Date(parseInt(item.timestamp))).toString()}</h1> */}
      <div className="container mt-5">
        <h1 className="row">Task name: {item.name}</h1>
        <h3 className="row">Task description: {item.desc}</h3>
        <h6 className="row">
          Deadline:{" "}
          {new Date(item.deadline).toLocaleDateString("en", {
            weekday: "long",
          })}
          ,{" "}
          {new Date(item.deadline).toLocaleString("en", { dateStyle: "long" })}
        </h6>
        <div className="row">
          Status: {item.completed ? <h6 className="text-success">Completed<i className="fas fa-check ms-2" /></h6> : <h6 className="text-danger">Not completed<i className="fas fa-times ms-2" /></h6>}
        </div>
        <h6 className="row">
          Last edited:{" "}
          {new Date(parseInt(item.timestamp)).toLocaleDateString("en", {
            weekday: "long",
          })}
          ,{" "}
          {new Date(parseInt(item.timestamp)).toLocaleString("en", {
            dateStyle: "long",
          })}
          , {new Date(parseInt(item.timestamp)).toLocaleTimeString()}
        </h6>
        <div className="mt-2">
          <button
            type="button"
            className="btn btn-success"
            onClick={() => setShowEdit(!showEdit)}
          >
            <i className="fas fa-pen"></i> Edit
          </button>
        </div>
        <div className="row">
          {showEdit ? (
            <EditPanel data={data} setData={setData} item={item} />
          ) : null}
        </div>
      </div>
    </>
  );

  return (
    <>
      <button className="btn btn-outline-primary" onClick={() => navigate("/")}>
        Back to Homepage
      </button>
      {!isLoading ? (
        !error ? (
          main
        ) : (
          <h1>Item not found</h1>
        )
      ) : (
        <h1 className="text-center">
          Loading...
          <div className="spinner-border text-dark" role="status"></div>
        </h1>
      )}
    </>
  );
};

export default ItemDetail;
