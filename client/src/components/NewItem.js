const NewItem = ({
  name,
  setName,
  desc,
  setDesc,
  handleSubmit,
  deadline,
  setDeadline,
}) => {
  return (
    <form
      className="row g-3 align-items-center mb-3"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <div className="col-auto">
        <input
          type="text"
          className="form-control"
          placeholder="Add Todo Name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength="50"
          required
        />
      </div>
      <div className="col-auto">
        <input
          type="text"
          className="form-control"
          placeholder="Add Description..."
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          maxLength="200"
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
  );
};

export default NewItem;
