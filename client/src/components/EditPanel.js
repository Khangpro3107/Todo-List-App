import { useState } from "react";
import axios from "axios";

const EditPanel = ({ data, setData, item }) => {
  const URL = "http://localhost:3001/";

  const [text, setText] = useState(item.text);
  const [completed, setCompleted] = useState(item.completed);
  const [deadline, setDeadline] = useState(item.deadline);

  const handleTextChange = (e) => {
    e.preventDefault();
    setText(e.target.value);
  };

  const handleUpdate = async (item) => {
    const filteredList = data.filter((_item) => item._id !== _item._id);
    const newList = [
      ...filteredList,
      { ...item, completed: completed, text: text, deadline: deadline },
    ];
    const sortedList = newList.sort((a, b) => {
      return Date.parse(a.deadline) < Date.parse(b.deadline) ? -1 : 1;
    });
    const notCompletedList = sortedList.filter((item) => !item.completed);
    const completedList = sortedList.filter((item) => item.completed);
    await axios
      .patch(`${URL}todo/${item._id}`, { text: text, completed: completed, deadline: deadline })
      .then((res) => {
        setData(notCompletedList.concat(completedList));
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <>
      <form className="row g-3 align-items-center" onSubmit={() => handleUpdate(item)}>
        <div className="col-auto">
          <label for="taskContent" className="col-form-label">
            Task
          </label>
        </div>
        <div className="col-auto">
            <input
              type="text"
              className="form-control"
              id="taskContent"
              value={text}
              maxLength="50"
              onChange={(e) => handleTextChange(e)}
            />
        </div>
        <div className="col-auto">
          <label for="taskCompleted" className="col-form-label">
            Completed
          </label>
        </div>
        <div className="col-auto">
          <input
            type="checkbox"
            id="taskCompleted"
            className="form-check-input"
            checked={completed}
            onChange={(e) => {
            setCompleted(!completed);
          }}
          />
        </div>
        <div className="col-auto">
          <label for="taskDeadline" className="col-form-label">
            Deadline
          </label>
        </div>
        <div className="col-auto">
          <input
            type="date"
            id="taskDeadline"
            value={deadline}
            className="form-control"
            onChange={(e) => {
            setDeadline(e.target.value);
          }}
          />
        </div>
        <button type="submit" className="btn btn-primary col-auto">
          <i className="fas fa-save"></i> Save
        </button>
      </form>
      {/* <form onSubmit={() => handleUpdate(item)} className="mt-2">
        <input
          className="form-control me-2"
          type="text"
          value={text}
          onChange={(e) => handleTextChange(e)}
        />
        <input
          className="form-check-input"
          type="checkbox"
          checked={completed}
          onChange={(e) => {
            setCompleted(!completed);
          }}
        />
        <button type="submit" className="btn btn-primary">
          <i className="fas fa-save"></i> Save
        </button>
      </form> */}
    </>
  );
};

export default EditPanel;
