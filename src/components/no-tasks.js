import {createNode} from "../utils";

const createNoTasksTemplate = () => {
  return (
    `<p class="board__no-tasks">
      Click «ADD NEW TASK» in menu to create your first task
    </p>`
  );
};


export default class NoTasks {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createNoTasksTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createNode(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
