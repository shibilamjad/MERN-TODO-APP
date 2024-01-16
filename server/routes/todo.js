const express = require("express");
// const { v4: uuidv4 } = require("uuid");
const router = express.Router();
const todos = require("../model/todoModel");
const todoList = [
  {
    todo: "hello",
    picked: false,
  },
];

router.get("/", async (req, res) => {
  try {
    const todoList = await todos.find().select(" todo picked");
    res.status(200).json(todoList);
  } catch (error) {
    console.error("MongoDB Find Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { todo } = req.body;

    const todoItem = {
      todo: todo,
      picked: false,
    };

    const newTodo = await todos.create(todoItem);

    res.json(newTodo);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

router.put("/", async (req, res) => {
  try {
    const { _id, todo, picked } = req.body;

    const fieldUpdate = {
      todo,
      picked,
    };

    const updatedTodo = await todos.findByIdAndUpdate(_id, fieldUpdate, {
      new: true,
    });
    if (updatedTodo) {
      res.json(updatedTodo);
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

router.delete("/", async (req, res) => {
  try {
    const { _id } = req.body;

    const deletedTodo = await todos.findByIdAndDelete(_id);

    if (deletedTodo) {
      return res.json(deletedTodo);
    }
    res.status(400).json({
      message: `Item does not exist`,
    });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
});

module.exports = router;
