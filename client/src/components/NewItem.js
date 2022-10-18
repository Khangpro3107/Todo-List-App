const NewItem = ({ newItem, setNewItem, handleSubmit, deadline, setDeadline }) => {
  return (
    <form
      className="mb-3 input-group"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <input
        type="text"
        className="form-control"
        placeholder="Add New Item..."
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        required
      ></input>
      <input required type="date" className="form-control" onChange={(e) => {
        setDeadline(e.target.value);
        }}/>
      <button type="submit" className="btn btn-primary">
        Add Task
      </button>
    </form>
  );
};

export default NewItem;
