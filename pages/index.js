import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = document.forms["add-todo-form"];
const addTodoCloseButton = addTodoPopup.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

function openModal(modal) {
  modal.classList.add("popup_visible");
}

function closeModal(modal) {
  modal.classList.remove("popup_visible");
}

function generateTodo(data) {
  const todo = new Todo(data, "#todo-template");
  const todoElement = todo.getView();
  return todoElement;
}

function renderTodo(item) {
  const todo = generateTodo(item);
  todosList.append(todo);
}

addTodoButton.addEventListener("click", () => {
  openModal(addTodoPopup);
});

addTodoCloseButton.addEventListener("click", () => {
  closeModal(addTodoPopup);
});

addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;

  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const id = uuidv4();
  const values = { name, date, id };
  renderTodo(values);
  todoValidator.resetValidation();
  closeModal(addTodoPopup);
});

initialTodos.forEach((item) => {
  renderTodo(item);
});

const todoValidator = new FormValidator(validationConfig, addTodoForm);
todoValidator.enableValidation();
