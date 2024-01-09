import { Button } from "../../ui/Button";
import "./EditSection.css";

export function EditSection({
  handleId,
  handleUpdate,
  setTodoValue,
  newTodoValue,
}) {
  function handleEditSubmit(e) {
    e.preventDefault();
    if (!newTodoValue) return;
    handleUpdate();
    setTodoValue("");
    handleId();
  }

  function handleChange(e) {
    setTodoValue(e.target.value);
  }

  return (
    <form className="EditSection-container" onSubmit={handleEditSubmit}>
      <input
        type="text"
        id={newTodoValue}
        placeholder="Edit Todo"
        defaultValue={newTodoValue}
        onChange={handleChange}
      />

      <Button type="submit">Add</Button>
      <Button onClick={handleId}>cancel</Button>
    </form>
  );
}
