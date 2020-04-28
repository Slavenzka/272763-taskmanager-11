import AbstractComponent from './abstract-component';

const createButtonMore = () => (
  `<button class="load-more" type="button">load more</button>`
);

export default class LoadMoreButton extends AbstractComponent {
  getTemplate() {
    return createButtonMore();
  }

  setClickHandler(handler) {
    this._element.addEventListener(`click`, handler);
  }
}
