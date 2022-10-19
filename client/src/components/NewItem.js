const NewItem = ({ newItem, setNewItem, handleSubmit, deadline, setDeadline }) => {
  return (
    <form className="row g-3 align-items-center" onSubmit={(e) => {
      e.preventDefault();
      handleSubmit();
    }}>
        <div className="col-auto">
            <input
              type="text"
              className="form-control"
              placeholder="Add New Item..."
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              maxLength="50"
              required
            />
        </div>
        <div className="col-auto">
          <input
            required
            type="date"
            className="form-control"
            value={deadline}
            onChange={(e) => {
        setDeadline(e.target.value);
        }}
          />
        </div>
        <button type="submit" className="btn btn-primary col-auto">
          <i className="fas fa-plus"></i> Add Task
        </button>
      </form>

    //   {/* <form
    //   className="mb-3 input-group"
    //   onSubmit={(e) => {
    //     e.preventDefault();
    //     handleSubmit();
    //   }}
    // >
    //   <input
    //     type="text"
    //     className="form-control"
    //     placeholder="Add New Item..."
    //     value={newItem}
    //     onChange={(e) => setNewItem(e.target.value)}
    //     required
    //   ></input>
    //   <input required type="date" className="form-control" onChange={(e) => {
    //     setDeadline(e.target.value);
    //     }}/>
    //   <button type="submit" className="btn btn-primary">
    //     Add Task
    //   </button>
    // </form> */}
  );
};

export default NewItem;
