const todoCompleteStatus = (todoItem) => {
  if (todoItem.completed == false) {
    todoItem.completed = !todoItem.completed;
  } else {
    todoItem.completed = true;
  }
  return todoItem;
};

const testToggleCompletion = () => {
  let item = {
    title: "Buy Milk",
    completed: false,
  };
  item = todoCompleteStatus(item);
  console.assert(item.completed === true, "Todo item should be Completed");
};
console.log(new Date().toISOString().split("T")[0]);
testToggleCompletion();
