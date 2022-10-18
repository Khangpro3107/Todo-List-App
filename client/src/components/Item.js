import React, { useState } from "react";
import EditPanel from "./EditPanel";

const Item = ({ item, handleDelete, data, setData }) => {
  const [showEdit, setShowEdit] = useState(false);

  return (
    <div className="row mb-2 bg-light">
      <p className="col-7">{item.text}</p>
      <div className="col-1">
        <input
          disabled
          type="checkbox"
          id="item-checkbox"
          className=""
          checked={item.completed}
        />
      </div>
      <div className="col-4 d-flex justify-content-between">
        <button
          type="button"
          className="btn btn-success"
          onClick={() => setShowEdit(!showEdit)}
        >
          Edit
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => handleDelete(item)}
        >
          Delete
        </button>
      </div>
      {showEdit ? (
        <EditPanel data={data} setData={setData} item={item} />
      ) : null}
    </div>
  );
};

export default Item;
