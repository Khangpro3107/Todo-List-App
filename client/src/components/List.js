import { useState } from "react";
import EditPanel from "./EditPanel";
import Item from "./Item";

const List = ({ data, setData, handleDelete }) => {
  return (
    <main className="row">
      {!data.length ? (
        <h3 className="">Empty list</h3>
      ) : (
        <>
          {data.map((item) => (
            <Item
              item={item}
              handleDelete={handleDelete}
              data={data}
              setData={setData}
              key={item._id}
              className="container"
            />
          ))}
        </>
      )}
    </main>
  );
};

export default List;
