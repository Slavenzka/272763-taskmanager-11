import {createNode} from '../utils';

const createTasksTemplate = () => {
  return (
    `
      <div class="board__tasks"></div>
    `
  );
};

export default class Tasks {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTasksTemplate();
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
