import AbstractComponent from './abstract-component';

const createBoardTemplate = () => (
  `<section class="board container">
    <div class="board__tasks"></div>
  </section>`
);

export default class Board extends AbstractComponent {
  getTemplate() {
    return createBoardTemplate();
  }
}
