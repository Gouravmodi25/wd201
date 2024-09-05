/* eslint-disable no-undef */
const todolist = require("../todo");
const { all, add, markAsComplete } = todolist();

describe("Test Todo Suite", () => {
  beforeAll(() => {
    add({
      title: "Test Todo",
      completed: false,
      dueDate: new Date().toISOString().split("T")[0],
    });
  });
  test("Should add todo", () => {
    const toDoCount = all.length;
    add({
      title: "Test Todo",
      completed: false,
      dueDate: new Date().toISOString().split("T")[0],
    });
    expect(all.length).toBe(toDoCount + 1);
  });
  test("Should Mark as Complete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });
});
