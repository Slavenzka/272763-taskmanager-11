import AbstractClass from './abstract-component';

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

export default class Filter extends AbstractClass {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
  }
}
