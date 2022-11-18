import React from "react";
import TodoList from "./TodoList";

const ListDisplay = ({ isLoading, data, setData, handleDelete }) => {
  return (
    <>
      {!isLoading ? (
        data.length ? (
          <TodoList data={data} setData={setData} handleDelete={handleDelete} />
        ) : (
          <h6 className="text-center mt-3">
            The list is currently empty. Enter some using the form below.
          </h6>
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

export default ListDisplay;
