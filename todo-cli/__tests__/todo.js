/* eslint-disable no-undef */
const db = require("../models");

describe("Todolist test suite", () => {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
  });
  test("Should add new todo", async () => {
    const todoItemCount = await db.Todo.count();
    await db.Todo.addTask({
      title: "Test todo",
      completed: false,
      dueDate: new Date(),
    });
    const newTodoItemsCount = await db.Todo.count();
    expect(newTodoItemsCount).toBe(todoItemCount + 1);
  });
});
