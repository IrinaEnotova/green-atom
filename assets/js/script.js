"use strict";

function createTodo(text) {
  const todoItem = document.createElement("li");
  todoItem.classList.add("todo-item");
  todoItem.innerHTML = `<span class="task-text">${text}</span>
  <div class="task-btns">
    <div class="complete-btn"></div>
    <div class="delete-btn"></div>
  </div>`;

  return todoItem;
}

function createList() {
  let tasks = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : [];
  const todoList = document.querySelector(".todo-list");
  todoList.innerHTML = "";

  if (tasks.length) {
    tasks.forEach((todo) => {
      todoList.append(createTodo(todo));
    });
  }
}

document.addEventListener("DOMContentLoaded", createList);

document.addEventListener("click", (event) => {
  const target = event.target;

  if (target.classList.contains("add-btn")) {
    const inputValue = document.querySelector(".input").value;

    if (inputValue) {
      let tasks = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : [];
      tasks.push(inputValue);
      localStorage.setItem("tasks", JSON.stringify(tasks));

      createList();
    }
  }
});
