import {createNode} from '../utils';

const createBoardTemplate = () => (
  `<section class="board container">
    <div class="board__tasks"></div>
  </section>`
);

export default class Board {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createBoardTemplate();
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
