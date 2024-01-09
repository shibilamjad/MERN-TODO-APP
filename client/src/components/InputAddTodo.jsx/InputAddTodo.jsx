import { Button } from "../../ui/Button";
import "./InputAddTodo.css";

export function InputAddTodo({
  handleSubmitValue,
  fieldInput,
  handleChangeValue,
}) {
  return (
    <form className="InputAddTodo-container" onSubmit={handleSubmitValue}>
      <input
        type="text"
        id={fieldInput}
        name={fieldInput}
        placeholder="New Todo"
        value={fieldInput}
        onChange={handleChangeValue}
      />
      <Button type="addbtn">Add</Button>
    </form>
  );
}
