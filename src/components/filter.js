import {createNode} from '../utils';

const createFilterMarkup = (name, count, isChecked) => (
  `
    <input
      type="radio"
      id="filter__${name}"
      class="filter__input visually-hidden"
      name="filter"
      ${isChecked ? `checked` : ``}
    />
    <label for="filter__${name}" class="filter__label">
      ${name} <span class="filter__${name}-count">${count}</span></label
    >
  `
);

const createFilterTemplate = (filters) => {
  const filtersMarkup = filters.map(({name, count}, index) => createFilterMarkup(name, count, index === 0)).join(`\n`);

  return (
    `<section class="main__filter filter container">
      ${filtersMarkup}
   </section>`
  );
};

export default class Filter {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
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
