const express = require("express");
const app = express();
const { Todo } = require("./models");

app.use(express.json());

app.get("/todos", async (req, res) => {
  try {
    const todo = await Todo.findAll();
    return res.json(todo);
  } catch (error) {
    return res.status(400).json(error);
  }
});

app.post("/todos", async (req, res) => {
  console.log("Creating a new Todo", req.body);
  try {
    const todo = await Todo.addTodo({
      title: req.body.title,
      dueDate: req.body.dueDate,
      completed: false,
    });
    return res.status(200).json(todo);
  } catch (error) {
    return res.status(422).json(error);
  }
});

app.put("/todos/:id/markAsCompleted", async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findByPk(id);
  try {
    const updatedTodo = await todo.markAsCompleted();
    return res.status(200).json(updatedTodo);
  } catch (error) {
    return res.status(404).json(error);
  }
});

// eslint-disable-next-line no-unused-vars
app.delete("/todos/:id", (req, res) => {
  console.log("Delete Todo ", req.params.id);
});

// server listen
module.exports = app;
