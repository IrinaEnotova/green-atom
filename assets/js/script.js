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
    tasks.forEach((todo, idx) => {
      const task = createTodo(todo.text);
      if (todo.isCompleted) {
        task.classList.add("completed-todo");
      }
      task.setAttribute("data-index", `${idx}`);
      todoList.append(task);
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
      tasks.push({ text: inputValue, isCompleted: false });
      localStorage.setItem("tasks", JSON.stringify(tasks));

      createList();
    }
  }

  if (target.classList.contains("delete-btn")) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    const currentIndex = +target.parentNode.parentNode.getAttribute("data-index");
    tasks.splice(currentIndex, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    createList();
  }

  if (target.classList.contains("complete-btn")) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    const currentIndex = +target.parentNode.parentNode.getAttribute("data-index");
    const currentTodo = tasks[currentIndex];

    currentTodo.isCompleted = true;
    tasks.splice(currentIndex, 1);
    tasks.push(currentTodo);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    createList();
  }

  if (target.classList.contains("shift-todo")) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.shift();
    localStorage.setItem("tasks", JSON.stringify(tasks));

    createList();
  }

  if (target.classList.contains("pop-task")) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.pop();
    localStorage.setItem("tasks", JSON.stringify(tasks));

    createList();
  }

  if (target.classList.contains("highlight-odd")) {
    const tasks = document.querySelectorAll(".todo-item");
    const btn = document.querySelector(".highlight-odd");

    btn.classList.toggle("highlighting");
    tasks.forEach((todo, idx) => {
      if ((idx + 1) % 2 !== 0) {
        todo.classList.toggle("highlighting");
      }
    });
  }

  if (target.classList.contains("highlight-even")) {
    const tasks = document.querySelectorAll(".todo-item");
    const btn = document.querySelector(".highlight-even");

    btn.classList.toggle("highlighting");
    tasks.forEach((todo, idx) => {
      if ((idx + 1) % 2 === 0) {
        todo.classList.toggle("highlighting");
      }
    });
  }
});
