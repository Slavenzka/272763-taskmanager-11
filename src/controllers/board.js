import {render, remove} from '../utils/render';
import NoTasksComponent from '../components/no-tasks';
import SortingComponent, {SORT_TYPE} from '../components/sort';
import {
  MODE,
  SHOWING_TASKS_COUNT_BY_BUTTON,
  SHOWING_TASKS_COUNT_ON_START,
} from '../const';
import LoadMoreButtonComponent from '../components/button-more';
import TaskController, {emptyTask} from './task';
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
  constructor(container, tasksModel) {
    this._container = container;
    this._tasksModel = tasksModel;

    this._showedTasksControllers = [];
    this._showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
    this._tasksComponent = new TasksComponent();
    this._noTaskComponent = new NoTasksComponent();
    this._sortComponent = new SortingComponent();
    this._loadMoreButtonComponent = new LoadMoreButtonComponent();

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onLoadMoreButtonClick = this._onLoadMoreButtonClick.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._tasksModel.setFilterChangeHandler(this._onFilterChange);
  }

  render() {
    const container = this._container.getElement();
    const tasks = this._tasksModel.getTasks();
    const isAllTasksArchived = tasks.every((task) => task.isArchive);

    if (isAllTasksArchived) {
      render(container, this._noTaskComponent);
      return;
    }

    render(container, this._sortComponent);
    render(container, this._tasksComponent);
    this._renderTasks(tasks.slice(0, this._showingTasksCount));

    this._renderLoadMoreButton();
  }

  _renderTasks(tasks) {
    const taskListElement = this._tasksComponent.getElement();

    const newTasks = renderTasks(tasks, taskListElement, this._onDataChange, this._onViewChange);
    this._showedTasksControllers = this._showedTasksControllers.concat(newTasks);
    this._showingTasksCount = this._showedTasksControllers.length;
  }

  _renderLoadMoreButton() {
    remove(this._loadMoreButtonComponent);

    if (this._showingTasksCount >= this._tasksModel.getTasks().length) {
      return;
    }

    const container = this._container.getElement();
    render(container, this._loadMoreButtonComponent);
    this._loadMoreButtonComponent.setClickHandler(this._onLoadMoreButtonClick);
  }

  _onLoadMoreButtonClick() {
    const prevTasksCount = this._showingTasksCount;
    const tasks = this._tasksModel.getTasks();

    this._showingTasksCount = this._showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

    const sortedTasks = getSortedTasks(tasks, this._sortComponent.getSortType(), prevTasksCount, this._showingTasksCount);
    this._renderTasks(sortedTasks);

    if (this._showingTasksCount >= sortedTasks.length) {
      remove(this._loadMoreButtonComponent);
    }
  }

  _removeTasks() {
    this._showedTasksControllers.forEach((taskController) => taskController.destroy());
    this._showedTasksControllers = [];
  }

  _updateTasks(count) {
    this._removeTasks();
    this._renderTasks(this._tasksModel.getTasks().slice(0, count));
    this._renderLoadMoreButton();
  }

  _onSortTypeChange(sortType) {
    this._showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

    const sortedTasks = getSortedTasks(this._tasksModel.getTasks(), sortType, 0, this._showingTasksCount);
    this._removeTasks();
    this._renderTasks(sortedTasks);
    this._renderLoadMoreButton();
  }

  _onViewChange() {
    this._showedTasksControllers.forEach((item) => item.setDefaultView());
  }

  _onDataChange(oldData, newData, taskController) {
    if (oldData === emptyTask) {
      this._creatingTask = null;

      if (newData === null) {
        taskController.destroy();
        this._updateTasks(this._showingTasksCount);
      } else {
        this._tasksModel.addTask(newData);
        taskController.render(newData, MODE.DEFAULT);

        if (this._showingTasksCount % SHOWING_TASKS_COUNT_BY_BUTTON === 0) {
          const destroyedTask = this._showedTasksControllers.pop();
          destroyedTask.destroy();
        }

        this._showedTaskControllers = [].concat(taskController, this._showedTaskControllers);
        this._showingTasksCount = this._showedTaskControllers.length;

        this._renderLoadMoreButton();
      }
    } else if (newData === null) {
      this._tasksModel.removeTask(oldData.id);
      this._updateTasks(this._showingTasksCount);
    } else {
      const isSuccess = this._tasksModel.updateTask(oldData.id, newData);

      if (isSuccess.status) {
        this._showedTasksControllers[isSuccess.index].render(newData);
      }
    }
  }

  _onFilterChange() {
    this._updateTasks(SHOWING_TASKS_COUNT_ON_START);
  }
}

