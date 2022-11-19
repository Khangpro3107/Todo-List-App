import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EditPanel from "./EditPanel";

// const URL = process.env.REACT_APP_BACKEND_URL;
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
      <div className="container mt-5 d-flex justify-content-between">
        <div className="d-flex flex-column justify-content-between">
          <h3>To-do name: {item.name?.length > 12 ? item.name?.slice(0, 12) + "..." : item.name}</h3>
          <h6>To-do description: {item.desc?.length > 30 ? item.desc?.slice(0, 30) + "..." : item.desc}</h6>
        </div>
        <div className="d-flex flex-column justify-content-between">
          <h6>
            Deadline:{" "}
            {new Date(item.deadline).toLocaleDateString("en", {
              weekday: "long",
            })}
            ,{" "}
            {new Date(item.deadline).toLocaleString("en", {
              dateStyle: "long",
            })}
          </h6>
          <div>
            Status:{" "}
            {item.completed ? (
              <span className="text-success">
                Completed
                <i className="fas fa-check ms-2" />
              </span>
            ) : (
              <span className="text-danger">
                Not completed
                <i className="fas fa-times ms-2" />
              </span>
            )}
          </div>
          <h6>
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
        </div>
        <div className="mt-2">
          <button
            type="button"
            className="btn btn-success"
            onClick={() => setShowEdit(!showEdit)}
          >
            <i className="fas fa-pen"></i> Edit
          </button>
        </div>
      </div>
      <div className="row">
        {showEdit ? (
          <EditPanel data={data} setData={setData} item={item} />
        ) : null}
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
          <h3 className="text-center mt-3">Item not found. Please try again.</h3>
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
