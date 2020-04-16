import {createNode} from '../utils';
import {SHOWING_TASKS_COUNT_BY_BUTTON, SHOWING_TASKS_COUNT_ON_START} from '../const';
import {renderTask} from '../main';

const createButtonMore = () => (
  `<button class="load-more" type="button">load more</button>`
);

export default class LoadMoreButton {
  constructor(tasks) {
    this._element = null;
    this._tasksCount = SHOWING_TASKS_COUNT_ON_START;
    this._tasks = tasks;
  }

  getTemplate() {
    return createButtonMore();
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

  setClickHandler(tasksContainer) {
    this._element.addEventListener(`submit`, () => {
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
