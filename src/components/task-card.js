import {MONTH_NAMES} from '../const';
import {formatTime} from '../utils/common';
import AbstractComponent from './abstract-component';

const createButtonMarkup = (name, isActive = true) => {
  return (
    `<button
      type="button"
      class="card__btn card__btn--${name} ${isActive ? `` : `card__btn--disabled`}"
    >
      ${name}
    </button>`
  );
};

const createTaskCardTemplate = (task) => {
  const {color, description, dueDate, repeatingDays} = task;

  const isExpired = dueDate instanceof Date && dueDate < Date.now();
  const isDateShowing = !!dueDate;

  const date = isDateShowing ? `${dueDate.getDate()} ${MONTH_NAMES[dueDate.getMonth()]}` : ``;
  const time = isDateShowing ? formatTime(dueDate) : ``;

  const repeatClass = Object.values(repeatingDays).some(Boolean) ? `card--repeat` : ``;
  const deadlineClass = isExpired ? `card--deadline` : ``;
  const editButton = createButtonMarkup(`edit`);
  const archiveButton = createButtonMarkup(`archive`, !task.isArchive);
  const favoritesButton = createButtonMarkup(`favourites`, !task.isFavorite);

  return (
    `<article class="card card--${color} ${repeatClass} ${deadlineClass}">
      <div class="card__form">
        <div class="card__inner">
          <div class="card__control">
            ${editButton}
            ${archiveButton}
            ${favoritesButton}
          </div>

          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>

          <div class="card__textarea-wrap">
            <p class="card__text">${description}</p>
          </div>

          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <div class="card__date-deadline">
                  <p class="card__input-deadline-wrap">
                    <span class="card__date">${date}</span>
                    <span class="card__time">${time}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>`
  );
};

export default class Task extends AbstractComponent {
  constructor(task) {
    super();
    this._task = task;
  }

  getTemplate() {
    return createTaskCardTemplate(this._task);
  }

  setEditClickHandler(handler) {
    const editButton = this._element.querySelector(`.card__btn--edit`);
    editButton.addEventListener(`click`, handler);
  }

  setFavoritesClickHandler(handler) {
    const favoritesButton = this.getElement().querySelector(`.card__btn--favorites`);
    favoritesButton.addEventListener(`click`, handler);
  }

  setArchiveClickHandler(handler) {
    const archiveButton = this.getElement().querySelector(`.card__btn--archive`);
    archiveButton.addEventListener(`click`, handler);
  }
}
