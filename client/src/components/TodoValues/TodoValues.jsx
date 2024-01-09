import "./TodoValues.css";
import { EditSection } from "../EditSection/EditSection";

export function TodoValues({
  description,
  handleDelete,
  handleId,
  todoId,
  handleUpdate,
  setTodoValue,
  newTodoValue,
  handletoggle,
}) {
  return (
    <>
      {description.map((items) => (
        <div key={items.id}>
          <div className="todo-values">
            <div className="todo-text">
              <button onClick={() => handletoggle(items.id)}>
                <p
                  style={
                    items.picked === true
                      ? { textDecoration: "line-through" }
                      : {}
                  }
                >
                  {items.todo}
                </p>
              </button>
            </div>
            <div className="todo-btn-container">
              <button className="edit-btn" onClick={() => handleId(items.id)}>
                <img src="/edit.png" alt="" />
              </button>
              <button
                className="edit-btn"
                onClick={() => handleDelete(items.id)}
              >
                <img src="/delete.png" alt="" />
              </button>
            </div>
          </div>
          <div>
            {todoId === items.id && (
              <EditSection
                description={items.fieldInput}
                handleId={handleId}
                handleUpdate={handleUpdate}
                setTodoValue={setTodoValue}
                newTodoValue={newTodoValue}
              />
            )}
          </div>
        </div>
      ))}
    </>
  );
}
