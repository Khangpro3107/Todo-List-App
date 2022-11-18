import React from "react";
import { useNavigate } from "react-router-dom";

const Item = ({ item, handleDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="row mb-2">
      <p className="col-5">{item.name}</p>
      <p className="col-2">{item.deadline.slice(0, 10)}</p>
      <div className="col-2">
        <input
          disabled
          type="checkbox"
          id="item-checkbox"
          className="form-check-input"
          checked={item.completed}
        />
      </div>
      <div className="col-3 d-flex justify-content-between">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => navigate(`/todo/${item._id}`)}
        >
          <i className="fas fa-info-circle"></i> Detail
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => handleDelete(item)}
        >
          <i className="fas fa-trash"></i> Delete
        </button>
      </div>
    </div>
  );
};

export default Item;
