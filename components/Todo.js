class Todo {
  constructor(data, selector) {
    this._data = data;
    this._todoTemplate = document.querySelector(selector);
  }

  _setEventListeners() {
    const todoDeleteButton =
      this._todoElement.querySelector(".todo__delete-btn");

    todoDeleteButton.addEventListener("click", () => {
      this._todoElement.remove();
    });

    this._todoCheckboxElement.addEventListener("change", () => {
      this._data.completed = !this._data.completed;
    });
  }

  _generateCheckboxElement() {
    this._todoCheckboxElement =
      this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");

    this._todoCheckboxElement.checked = this._data.completed;
    this._todoCheckboxElement.id = `todo-${this._data.id}`;
    this._todoLabel.setAttribute("for", `todo-${this._data.id}`);
  }

  _getDate() {
    const todoDate = this._todoElement.querySelector(".todo__date");
    const dueDate = new Date(this._data.date);

    if (!isNaN(dueDate)) {
      todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }
  }

  getView() {
    this._todoElement = this._todoTemplate.content
      .querySelector(".todo")
      .cloneNode(true);
    const todoNameElement = this._todoElement.querySelector(".todo__name");

    todoNameElement.textContent = this._data.name;

    this._getDate();
    this._generateCheckboxElement();
    this._setEventListeners();

    return this._todoElement;
  }
}

export default Todo;
