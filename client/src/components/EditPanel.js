import { useState } from "react";
import axios from "axios";

const EditPanel = ({ data, setData, item }) => {
  const URL = "http://localhost:3001/";

  const [text, setText] = useState(item.text);
  const [completed, setCompleted] = useState(item.completed);

  const handleTextChange = (e) => {
    e.preventDefault();
    setText(e.target.value);
  };

  const handleUpdate = (item) => {
    const filteredList = data.filter((_item) => item._id !== _item._id);
    const newList = [
      ...filteredList,
      { ...item, completed: completed, text: text },
    ];
    const sortedList = newList.sort((a, b) => {
      return Date.parse(a.deadline) < Date.parse(b.deadline) ? -1 : 1;
    });
    const notCompletedList = sortedList.filter((item) => !item.completed);
    const completedList = sortedList.filter((item) => item.completed);
    axios
      .patch(`${URL}todo/${item._id}`, { text: text, completed: completed })
      .then((res) => {
        setData(notCompletedList.concat(completedList));
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <>
      <form onSubmit={() => handleUpdate(item)} className="mt-2">
        <input
          className="form-control me-2"
          id="text"
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
      </form>
    </>
  );
};

export default EditPanel;
