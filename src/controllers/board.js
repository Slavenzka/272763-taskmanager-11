import {render, remove} from '../utils/render';
import NoTasksComponent from '../components/no-tasks';
import SortingComponent, {SORT_TYPE} from '../components/sort';
import {
  SHOWING_TASKS_COUNT_BY_BUTTON,
  SHOWING_TASKS_COUNT_ON_START,
} from '../const';
import LoadMoreButtonComponent from '../components/button-more';
import TaskController from './task';
import TasksComponent from '../components/tasks';

const renderTasks = (tasks, tasksContainer, onDataChange, onViewChange) => {
  return tasks.map((task) => {
    const taskController = new TaskController(tasksContainer, onDataChange, onViewChange);
    taskController.render(task);
    return taskController;
  });
};

const getSortedTasks = (tasks, sortType, from, to) => {
  let sortedTasks = [];
  const showingTasks = tasks.slice();

  switch (sortType) {
    case SORT_TYPE.DATE_DOWN:
      sortedTasks = showingTasks.sort((a, b) => a.dueDate < b.dueDate);
      break;
    case SORT_TYPE.DATE_UP:
      sortedTasks = showingTasks.sort((a, b) => a.dueDate > b.dueDate);
      break;
    case SORT_TYPE.DEFAULT:
      sortedTasks = showingTasks;
      break;
  }
  return sortedTasks.slice(from, to);
};

export default class BoardController {
  constructor(container) {
    this._container = container;

    this._tasks = [];
    this._showedTasksControllers = [];
    this._showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
    this._tasksComponent = new TasksComponent();
    this._noTaskComponent = new NoTasksComponent();
    this._sortComponent = new SortingComponent();
    this._loadMoreButtonComponent = new LoadMoreButtonComponent();

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  render(tasks) {
    this._tasks = tasks;
    const container = this._container.getElement();
    const isAllTasksArchived = this._tasks.every((task) => task.isArchive);

    if (isAllTasksArchived) {
      render(container, this._noTaskComponent);
      return;
    }

    render(container, this._sortComponent);
    render(container, this._tasksComponent);

    const tasksContainer = this._tasksComponent.getElement();

    const newTasks = renderTasks(this._tasks.slice(0, this._showingTasksCount), tasksContainer, this._onDataChange, this._onViewChange);
    this._showedTasksControllers = this._showedTasksControllers.concat(newTasks);

    this._renderLoadMoreButton();
  }

  _renderLoadMoreButton() {
    if (this._showingTasksCount >= this._tasks.length) {
      return;
    }

    const container = this._container.getElement();
    render(container, this._loadMoreButtonComponent);

    this._loadMoreButtonComponent.setClickHandler(() => {
      const prevTasksCount = this._showingTasksCount;
      const taskListElement = this._tasksComponent.getElement();
      this._showingTasksCount += SHOWING_TASKS_COUNT_BY_BUTTON;

      const sortedTasks = getSortedTasks(this._tasks, this._sortComponent.getSortType(), prevTasksCount, this._showingTasksCount);
      const newTasks = renderTasks(sortedTasks, taskListElement, this._onDataChange, this._onViewChange);
      this._showedTasksControllers = this._showedTasksControllers.concat(newTasks);

      if (this._showingTasksCount >= this._tasks.length) {
        remove(this._loadMoreButtonComponent);
      }
    });
  }

  _onSortTypeChange(sortType) {
    this._showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

    const sortedTasks = getSortedTasks(this._tasks, sortType, 0, this._showingTasksCount);
    const taskListElement = this._tasksComponent.getElement();

    taskListElement.innerHTML = ``;

    this._showedTasksControllers = renderTasks(sortedTasks, taskListElement, this._onDataChange, this._onViewChange);
    this._renderLoadMoreButton();
  }

  _onViewChange() {
    this._showedTasksControllers.forEach((item) => item.setDefaultView());
  }

  _onDataChange(oldData, newData) {
    const index = this._tasks.findIndex((item) => item === oldData);

    if (index === -1) {
      return;
    }

    this._tasks = [].concat(this._tasks.slice(0, index), newData, this._tasks.slice(index + 1));

    this._showedTasksControllers[index].render(this._tasks[index]);
  }
}

