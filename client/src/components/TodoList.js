import Item from "./Item";

const TodoList = ({ data, setData, handleDelete }) => {
  return (
    <main className="row w-100">
        <div className="row mb-2 fw-bold">
          <div className="col-5">Task</div>
          <div className="col-2">Deadline</div>
          <div className="col-2">Done</div>
          <div className="col-3">Actions</div>
        </div>
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
    </main>
  );
};

export default TodoList;
