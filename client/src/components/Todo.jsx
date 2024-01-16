import { useEffect, useState } from "react";
import { Header } from "./Header.jsx/Header";
import { InputAddTodo } from "./InputAddTodo.jsx/InputAddTodo";
import "./Todo.css";
import { TodoValues } from "./TodoValues/TodoValues";
import axios from "axios";

const API = "http://localhost:3006/api/todo";

function Todo() {
  const [description, setDescription] = useState([]);
  const [fieldInput, setFieldInput] = useState("");
  const [todoId, setTodoId] = useState(null);
  // const [newTodo, setNewTodo] = useState("");
  const [updatedTodo, setUpdatedTodo] = useState("");
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
      description.push(res.data);
      fetchTodo();
    } catch (error) {
      console.error(error.response.data.message);
    }
  }

  function handleId(_id) {
    setTodoId((todoId) => (todoId === _id ? null : _id));
    setUpdatedTodo("");
  }
  async function handleDelete(_id) {
    try {
      const res = await axios(API, {
        method: "DELETE",
        data: {
          _id,
        },
      });
      description.push(res.data);
      fetchTodo();
    } catch (error) {
      console.error(error.response.data.message);
    }
  }
  function handleToggle(_id) {
    setDescription((description) =>
      description.map((items) =>
        items._id === _id ? { ...items, picked: !items.picked } : items
      )
    );
    handleUpdate();
    console.log("Clicked");
  }

  async function handleUpdate() {
    try {
      const res = await axios(API, {
        method: "PUT",
        data: {
          _id: todoId,
          todo: updatedTodo,
          picked: newPicked,
        },
      });
      description.push(res.data);
      fetchTodo();
    } catch (error) {
      console.error(error.response.data.message);
    }
  }

  async function fetchTodo() {
    try {
      const res = await axios(API);
      console.log(res.data);
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
              setUpdatedTodo={setUpdatedTodo}
              updatedTodo={updatedTodo}
              handleToggle={handleToggle}
              setDescription={setDescription}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Todo;
