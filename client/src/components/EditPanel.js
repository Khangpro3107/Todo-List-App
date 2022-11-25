import { useState } from "react";
import axios from "axios";

const URL = "https://todolist-api-gwhc.onrender.com/";

const EditPanel = ({ data, setData, item }) => {
  const [name, setName] = useState(item.name);
  const [desc, setDesc] = useState(item.desc);
  const [completed, setCompleted] = useState(item.completed);
  const [deadline, setDeadline] = useState(item.deadline);

  const handleNameChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleDescChange = (e) => {
    e.preventDefault();
    setDesc(e.target.value);
  };

  const handleUpdate = async (item) => {
    const filteredList = data.filter((_item) => item._id !== _item._id);
    const newList = [
      ...filteredList,
      { ...item, desc: desc, completed: completed, name: name, deadline: deadline },
    ];
    const sortedList = newList.sort((a, b) => {
      return Date.parse(a.deadline) < Date.parse(b.deadline) ? -1 : 1;
    });
    const notCompletedList = sortedList.filter((item) => !item.completed);
    const completedList = sortedList.filter((item) => item.completed);
    await axios
      .patch(`${URL}todo/${item._id}`, {
        name: name,
        desc: desc,
        completed: completed,
        deadline: deadline,
      })
      .then((res) => {
        setData(notCompletedList.concat(completedList));
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <>
      <form
        className="row g-3 align-items-center"
        onSubmit={() => handleUpdate(item)}
      >
        <div className="col-auto d-flex justify-space-between">
          <div className="me-2">
            <label for="taskName" className="col-form-label">
              Task
            </label>
          </div>
          <input
            type="text"
            className="form-control me-4"
            id="taskName"
            value={name}
            maxLength="50"
            required
            onChange={(e) => handleNameChange(e)}
          />
          <div className="me-2">
            <label for="taskDesc" className="col-form-label">
              Description
            </label>
          </div>
          <input
            type="text"
            className="form-control me-4"
            id="taskDescription"
            value={desc}
            maxLength="50"
            onChange={(e) => handleDescChange(e)}
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
            className="form-check-input me-4"
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
    </>
  );
};

export default EditPanel;
