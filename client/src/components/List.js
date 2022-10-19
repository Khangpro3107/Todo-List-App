import Item from "./Item";

const List = ({ data, setData, handleDelete }) => {
  const temp = (
    <main className="row">
        <>
          <div className="row mb-2 fw-bold">
            <div className="col-5">Task</div>
            <div className="col-2">Deadline</div>
            <div className="col-1">Done</div>
            <div className="col-4">Actions</div>
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
        </>
    </main>
  );

  return temp;
};

export default List;
