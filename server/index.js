const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const app = express();

app.use(cors());
app.use(express.json());

const tgit branch -M mainodoValues = [
  {
    id: uuidv4(),
    todo: "hello",
    picked: false,
  },
];

app.get("/api/todo", (req, res) => {
  res.status(200).json(todoValues);
});

app.post("/api/todo", (req, res) => {
  const { todo } = req.body;

  if (!("todo" in req.body)) {
    res.status(400).json({
      message: `${JSON.stringify(
        req.body
      )}:This attribute not accepted, Required attributes todo `,
    });
    return;
  }

  const todoList = {
    id: uuidv4(),
    todo: todo,
    picked: false,
  };
  todoValues.push(todoList);
  res.json(todoValues);
});

app.put("/api/todo", (req, res) => {
  const { id, todo, picked } = req.body;

  const isExits = todoValues.find((data) => data.id === id);

  if (isExits) {
    todoValues.map((todoList) => {
      if (todoList.id === id) {
        todoList.todo = todo;
        todoList.picked = picked || false;
      }
    });
    res.json(todoValues);
  }
  res.status(400).json({
    message: `Items with id :${id} does not exist`,
  });
});

app.delete("/api/todo", (req, res) => {
  const { id } = req.body;
  const todoIndex = todoValues.findIndex((item) => item.id === id);

  if (todoIndex !== -1) {
    todoValues.splice(todoIndex, 1);
    return res.json(todoValues);
  }
  res.status(400).json({
    message: `Item does not exist`,
  });
});

app.all("*", (req, res) => {
  res.status(404).json("This page does not exist");
});

const PORT = 3005;
app.listen(PORT, () => console.log(`server running ${PORT}`));
