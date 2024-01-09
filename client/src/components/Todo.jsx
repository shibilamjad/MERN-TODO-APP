import { useEffect, useState } from "react";
import { Header } from "./Header.jsx/Header";
import { InputAddTodo } from "./InputAddTodo.jsx/InputAddTodo";
import "./Todo.css";
import { TodoValues } from "./TodoValues/TodoValues";
import axios from "axios";

const API = "http://localhost:3005/api/todo";

function Todo() {
  const [description, setDescription] = useState([]);
  const [fieldInput, setFieldInput] = useState("");
  const [todoId, setTodoId] = useState(null);
  const [newTodoValue, setTodoValue] = useState("");
  const [newPicked, setNewPicked] = useState(false);

  function handleSubmitValue(e) {
    e.preventDefault();
    if (!fieldInput) return;
    handleAddItem();
    setFieldInput("");
  }

  function handleChangeValue(e) {
    setFieldInput(e.target.value);
  }

  async function handleAddItem() {
    try {
      const res = await axios(API, {
        method: "POST",
        data: {
          todo: fieldInput,
        },
      });
      setDescription(res.data);
    } catch (error) {
      console.error(error.response.data.message);
    }
  }

  function handleId(id) {
    setTodoId((todoId) => (todoId === id ? null : id));
    setTodoValue("");
  }
  async function handleDelete(id) {
    try {
      const res = await axios(API, {
        method: "DELETE",
        data: {
          id,
        },
      });
      setDescription(res.data);
    } catch (error) {
      console.error(error.response.data.message);
    }
  }

  async function handleUpdate() {
    if (handleId) {
      try {
        const res = await axios(API, {
          method: "PUT",
          data: {
            id: todoId,
            todo: newTodoValue,
            picked: false,
          },
        });

        setDescription(res.data);
      } catch (error) {
        console.error(error.response.data.message);
      }
    }
  }

  function handletoggle(id) {
    setDescription((description) =>
      description.map((items) =>
        items.id === id ? { ...items, picked: !items.picked } : items
      )
    );
  }

  async function fetchTodo() {
    try {
      const res = await axios(API);
      setDescription(res.data);
    } catch (error) {
      console.error(error.response.data.message);
    }
  }

  useEffect(() => {
    fetchTodo();
  }, []);
  // console.log(description);

  return (
    <div className="todo-container">
      <div className="todo-shadow">
        <div className="todo-bg">
          <div>
            <Header />
            <InputAddTodo
              handleSubmitValue={handleSubmitValue}
              handleChangeValue={handleChangeValue}
              fieldInput={fieldInput}
            />
          </div>
          <div className="todo-overflow">
            <TodoValues
              todoId={todoId}
              description={description}
              handleId={handleId}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
              setTodoValue={setTodoValue}
              newTodoValue={newTodoValue}
              handletoggle={handletoggle}
              setDescription={setDescription}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Todo;
