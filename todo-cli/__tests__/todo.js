/* eslint-disable no-undef */
const todolist = require("../todo");
const { all, add, markAsComplete, overdue, dueToday, dueLater } = todolist();

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
  test("Should retrieval of overdue items", () => {
    const overdueDateItem = overdue();
    const prev_date = new Date();
    prev_date.setDate(prev_date.getDate() - 1);
    let previousDate = prev_date.toISOString().split("T")[0];
    add({
      title: "previous date",
      completed: false,
      dueDate: previousDate,
    });
    expect(overdue().length).toBe(overdueDateItem.length + 1);
  });
  test("Should retrieval of due today items", () => {
    const dueTodayItem = dueToday();
    let today_date = new Date();
    today_date.setDate(today_date.getDate());
    const todayDate = today_date.toISOString().split("T")[0];
    add({
      title: "Today date",
      completed: false,
      dueDate: todayDate,
    });
    expect(dueToday().length).toBe(dueTodayItem.length + 1);
  });
  test("Should retrieval of due later items", () => {
    const dueLaterDateItem = dueLater();
    const later_date = new Date();
    later_date.setDate(later_date.getDate() + 1);
    let laterDate = later_date.toISOString().split("T")[0];
    add({
      title: "previous date",
      completed: false,
      dueDate: laterDate,
    });
    expect(dueLater().length).toBe(dueLaterDateItem.length + 1);
  });
});
