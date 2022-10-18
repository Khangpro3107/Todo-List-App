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
    axios
      .patch(`${URL}todo/${item._id}`, { text: text, completed: completed })
      .then((res) => {
        console.log(text, completed);
        setData(
          newList.sort((a, b) => {
            return a.text < b.text ? -1 : 1;
          })
        );
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <>
      <form onSubmit={() => handleUpdate(item)}>
        <input id="text" value={text} onChange={(e) => handleTextChange(e)} />
        <input
          type="checkbox"
          checked={completed}
          onChange={(e) => {
            setCompleted(!completed);
          }}
        />
        <button type="submit" className="btn btn-primary">Save</button>
      </form>
    </>
  );
};

export default EditPanel;
