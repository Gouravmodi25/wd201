/* eslint-disable no-unused-vars */
const { connect } = require("./connectDB");
const Todo = require("./TodoModel");

const createTodo = async () => {
  try {
    const todo = await Todo.addTask({
      title: "Third item",
      dueDate: new Date(),
      completed: true,
    });
    console.log(`Create todo with id ${todo.id}`);
  } catch (error) {
    console.log(error);
  }
};

const countItem = async () => {
  try {
    const todoCount = await Todo.count();
    console.log(`Found ${todoCount} Items in the Table!`);
  } catch (error) {
    console.log(error);
  }
};
const getAllTodos = async () => {
  try {
    const todo = await Todo.findAll();
    const todoList = await todo
      .map((todo) => todo.displayableString())
      .join("\n");
    console.log(todoList);
  } catch (error) {
    console.log(error);
  }
};
const getSingleTodo = async () => {
  try {
    const todo = await Todo.findOne({
      where: {
        completed: false,
      },
    });
    console.log(todo.displayableString());
  } catch (error) {
    console.log(error);
  }
};

const updateTodo = async (id) => {
  try {
    await Todo.update(
      { completed: true },
      {
        where: {
          id: id,
        },
      },
    );
  } catch (error) {
    console.log(error);
  }
};
const deleteItem = async (id) => {
  try {
    const deleterowCount = await Todo.destroy({
      where: {
        id: id,
      },
    });
    console.log(`Delete ${deleterowCount} Row`);
  } catch (error) {
    console.log(error);
  }
};

(async () => {
  // await createTodo();
  // await countItem();
  // await updateTodo(2);
  await deleteItem(2);
  await getAllTodos();
})();
