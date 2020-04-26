import {SHOWING_TASKS_COUNT_ON_START} from '../const';
import AbstractComponent from './abstract-component';

const createButtonMore = () => (
  `<button class="load-more" type="button">load more</button>`
);

export default class LoadMoreButton extends AbstractComponent {
  constructor(tasks, renderTask) {
    super();
    this._tasksCount = SHOWING_TASKS_COUNT_ON_START;
    this._tasks = tasks;
    this._renderTask = renderTask;
  }

  getTemplate() {
    return createButtonMore();
  }

  setClickHandler(handler) {
    this._element.addEventListener(`click`, handler);
    // this._element.addEventListener(`click`, () => {
    //   let prevTasksCounter = this._tasksCount;
    //   this._tasksCount += SHOWING_TASKS_COUNT_BY_BUTTON;
    //
    //   this._tasks.slice(prevTasksCounter, this._tasksCount)
    //     .forEach((task) => this._renderTask(tasksContainer, task));
    //
    //   if (this._tasksCount > this._tasks.length) {
    //     this._element.remove();
    //     this.removeElement();
    //   }
    // });
  }
}
