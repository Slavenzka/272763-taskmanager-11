import AbstractClass from './abstract-component';

export const SORT_TYPE = {
  DATE_DOWN: `date-down`,
  DATE_UP: `date-up`,
  DEFAULT: `default`
};

const createSortTemplate = () => {
  return (
    `<div class="board__filter-list">
      <a href="#" data-sort-type="${SORT_TYPE.DEFAULT}" class="board__filter" data-sort-type="default">SORT BY DEFAULT</a>
      <a href="#" data-sort-type="${SORT_TYPE.DATE_UP}" class="board__filter" data-sort-type="date-up">SORT BY DATE up</a>
      <a href="#" data-sort-type="${SORT_TYPE.DATE_DOWN}" class="board__filter" data-sort-type="date-down">SORT BY DATE down</a>
    </div>`
  );
};

export default class Sorting extends AbstractClass {
  constructor() {
    super();
    this._currentSortType = SORT_TYPE.DEFAULT;
  }

  getTemplate() {
    return createSortTemplate();
  }

  getSortType() {
    return this._currentSortType;
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      if (this._currentSortType === sortType) {
        return;
      }

      this._currentSortType = sortType;
      handler(this._currentSortType);
    });
  }
}
