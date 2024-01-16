import { Button } from "../../ui/Button";
import "./EditSection.css";

export function EditSection({
  handleId,
  handleUpdate,
  setUpdatedTodo,
  updatedTodo,
}) {
  function handleEditSubmit(e) {
    e.preventDefault();
    if (!updatedTodo) return;
    handleUpdate();
    setUpdatedTodo("");
    handleId();
  }

  function handleChange(e) {
    setUpdatedTodo(e.target.value);
  }

  return (
    <form className="EditSection-container" onSubmit={handleEditSubmit}>
      <input
        type="text"
        id={updatedTodo}
        placeholder="Edit Todo"
        defaultValue={updatedTodo}
        onChange={handleChange}
      />

      <Button type="submit">Add</Button>
      <Button onClick={handleId}>cancel</Button>
    </form>
  );
}
