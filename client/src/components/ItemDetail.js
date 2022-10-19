import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const ItemDetail = () => {
  const id = useParams().id;
  const URL = "http://localhost:3001/";

  const [item, setItem] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await axios.get(`${URL}todo/${id}`).then((res) => {
          if (res.data) setItem(res.data);
        });
      } catch (error) {
        setError(error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [id]);

  const main = (
    <>
      {/* <h1>{item.text}, {(new Date(item.deadline)).toString()}, {(new Date(parseInt(item.timestamp))).toString()}</h1> */}
      <div className="container">
        <h1 className="row">Task: {item.text}</h1>
        <h1 className="row">
          Deadline:{" "}
          {new Date(item.deadline).toLocaleDateString("en", {
            weekday: "long",
          })}
          ,{" "}
          {new Date(item.deadline).toLocaleString("en", { dateStyle: "long" })}
        </h1>
        <h1 className="row">
          Status: {item.completed ? <>Completed</> : <>Not completed</>}
        </h1>
        <h1 className="row">
          Last edited:{" "}
          {new Date(parseInt(item.timestamp)).toLocaleDateString("en", {
            weekday: "long",
          })}
          ,{" "}
          {new Date(parseInt(item.timestamp)).toLocaleString("en", {
            dateStyle: "long",
          })}
          , {new Date(parseInt(item.timestamp)).toLocaleTimeString()}
        </h1>
      </div>
    </>
  );

  return (
    <>
      <Link to="/">Back to Homepage</Link>
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
