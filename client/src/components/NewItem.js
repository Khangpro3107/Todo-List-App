const NewItem = ({ newItem, setNewItem, handleSubmit }) => {
  return (
    <form
      className="row mb-3 g-3"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <input
        type="text"
        className="form-control col"
        placeholder="Add New Item..."
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        required
      ></input>
      <button type="submit" className="btn btn-primary col">
        Add Task
      </button>
    </form>
  );
};

export default NewItem;
