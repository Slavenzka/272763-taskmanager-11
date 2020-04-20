import TaskComponent from '../components/task-card';
import TaskEditComponent from '../components/task-form';
import {render} from '../utils/render';
import NoTasksComponent from '../components/no-tasks';
import SortingComponent, {SORT_TYPE} from '../components/sort';
import {
  RENDER_POSITION,
  SHOWING_TASKS_COUNT_BY_BUTTON,
  SHOWING_TASKS_COUNT_ON_START,
} from '../const';
import LoadMoreButtonComponent from '../components/button-more';

const renderTask = (taskListElement, task) => {
  const taskComponent = new TaskComponent(task);
  taskComponent.getElement();

  const taskEditComponent = new TaskEditComponent(task);
  taskEditComponent.getElement();

  taskComponent.editClickHandler(taskListElement, taskEditComponent, () => taskEditComponent.addEscHandler(taskListElement, taskComponent));
  taskEditComponent.addSubmitHandler(taskListElement, taskComponent);

  render(taskListElement, taskComponent);
};

const renderTasks = (tasks, tasksContainer) => {
  tasks.forEach((task) => {
    renderTask(tasksContainer, task);
  });
};

const addLoadMoreButton = (container, tasks, tasksContainer) => {
  const loadMoreButton = new LoadMoreButtonComponent(tasks, renderTask);
  render(container, loadMoreButton);
  loadMoreButton.setClickHandler(tasksContainer);
  return loadMoreButton;
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

    this._noTaskComponent = new NoTasksComponent();
    this._sortComponent = new SortingComponent();
  }

  render(tasks) {
    const container = this._container.getElement();
    const isAllTasksArchived = tasks.every((task) => task.isArchive);

    if (isAllTasksArchived) {
      render(container, this._noTaskComponent);
      return;
    }

    render(container, this._sortComponent, RENDER_POSITION.AFTERBEGIN);

    const tasksContainer = container.querySelector(`.board__tasks`);

    renderTasks(tasks.slice(0, SHOWING_TASKS_COUNT_ON_START), tasksContainer);
    let loadMoreButton = addLoadMoreButton(container, tasks, tasksContainer);

    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      let showingTasksCount = SHOWING_TASKS_COUNT_BY_BUTTON;
      const sortedTasks = getSortedTasks(tasks, sortType, 0, tasks.length - 1);

      tasksContainer.innerHTML = ``;
      loadMoreButton.removeElement();

      renderTasks(sortedTasks.slice(0, showingTasksCount), tasksContainer);
      loadMoreButton = addLoadMoreButton(container, sortedTasks, tasksContainer);
    });
  }
}

