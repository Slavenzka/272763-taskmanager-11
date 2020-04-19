import AbstractClass from './abstract-component';

const createBoardTemplate = () => (
  `<section class="board container">
    <div class="board__tasks"></div>
  </section>`
);

export default class Board extends AbstractClass {
  getTemplate() {
    return createBoardTemplate();
  }
}
