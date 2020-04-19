import {SHOWING_TASKS_COUNT_BY_BUTTON, SHOWING_TASKS_COUNT_ON_START} from '../const';
import {renderTask} from '../main';
import AbstractClass from './abstract-component';

const createButtonMore = () => (
  `<button class="load-more" type="button">load more</button>`
);

export default class LoadMoreButton extends AbstractClass {
  constructor(tasks) {
    super();
    this._tasksCount = SHOWING_TASKS_COUNT_ON_START;
    this._tasks = tasks;
  }

  getTemplate() {
    return createButtonMore();
  }

  setClickHandler(tasksContainer) {
    this._element.addEventListener(`click`, () => {
      let prevTasksCounter = this._tasksCount;
      this._tasksCount += SHOWING_TASKS_COUNT_BY_BUTTON;

      this._tasks.slice(prevTasksCounter, this._tasksCount)
        .forEach((task) => renderTask(tasksContainer, task));

      if (this._tasksCount > this._tasks.length) {
        this._element.remove();
        this.removeElement();
      }
    });
  }
}
