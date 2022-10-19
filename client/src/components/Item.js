import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EditPanel from "./EditPanel";

const Item = ({ item, handleDelete, data, setData }) => {

  const navigate = useNavigate();

  const [showEdit, setShowEdit] = useState(false);

  return (
    <div className="row mb-2">
      <p className="col-5">{item.text}</p>
      <p className="col-2">{item.deadline.slice(0, 10)}</p>
      <div className="col-1">
        <input
          disabled
          type="checkbox"
          id="item-checkbox"
          className="form-check-input"
          checked={item.completed}
        />
      </div>
      <div className="col-4 d-flex justify-content-between">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => navigate(`/todo/${item._id}`)}
        >
        <i className="fas fa-info-circle"></i> Detail
        </button>
        <button
          type="button"
          className="btn btn-success"
          onClick={() => setShowEdit(!showEdit)}
        >
          <i className="fas fa-pen"></i> Edit
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => handleDelete(item)}
        >
          <i className="fas fa-trash"></i> Delete
        </button>
      </div>
      {showEdit ? (
        <EditPanel data={data} setData={setData} item={item} />
      ) : null}
    </div>
  );
};

export default Item;
