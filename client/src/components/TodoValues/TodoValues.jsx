import "./TodoValues.css";
import { EditSection } from "../EditSection/EditSection";

export function TodoValues({
  description,
  handleDelete,
  handleId,
  todoId,
  handleUpdate,
  setUpdatedTodo,
  updatedTodo,
  handleToggle,
}) {
  return (
    <>
      {description.map((items) => (
        <div key={items._id}>
          <div className="todo-values">
            <div className="todo-text">
              <button onClick={() => handleToggle(items._id)}>
                <p
                  style={items.picked ? { textDecoration: "line-through" } : {}}
                >
                  {items.todo}
                </p>
              </button>
            </div>
            <div className="todo-btn-container">
              <button className="edit-btn" onClick={() => handleId(items._id)}>
                <img src="/edit.png" alt="" />
              </button>
              <button
                className="edit-btn"
                onClick={() => handleDelete(items._id)}
              >
                <img src="/delete.png" alt="" />
              </button>
            </div>
          </div>
          <div>
            {todoId === items._id && (
              <EditSection
                description={items.fieldInput}
                handleId={handleId}
                handleUpdate={handleUpdate}
                setUpdatedTodo={setUpdatedTodo}
                updatedTodo={updatedTodo}
              />
            )}
          </div>
        </div>
      ))}
    </>
  );
}
