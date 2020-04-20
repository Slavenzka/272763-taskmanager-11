import TaskComponent from '../components/task-card';
import TaskEditComponent from '../components/task-form';
import {render} from '../utils/render';
import NoTasksComponent from '../components/no-tasks';
import SortingComponent from '../components/sort';
import {RENDER_POSITION, SHOWING_TASKS_COUNT_ON_START} from '../const';
import TasksComponent from '../components/tasks';
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

export default class BoardController {
  constructor(container) {
    this._container = container;

    this._noTaskComponent = new NoTasksComponent();
    this._sortComponent = new SortingComponent();
    this._tasksComponent = new TasksComponent();
  }

  render(tasks) {
    const container = this._container.getElement();
    const isAllTasksArchived = tasks.every((task) => task.isArchive);

    if (isAllTasksArchived) {
      render(container, this._noTaskComponent);
      return;
    }

    render(container, this._sortComponent, RENDER_POSITION.AFTERBEGIN);
    render(container, this._tasksComponent);

    const tasksContainer = container.querySelector(`.board__tasks`);

    tasks.slice(0, SHOWING_TASKS_COUNT_ON_START)
      .forEach((task) => {
        renderTask(tasksContainer, task);
      });

    const loadMoreButton = new LoadMoreButtonComponent(tasks, renderTask);
    render(container, loadMoreButton);
    loadMoreButton.setClickHandler(tasksContainer);
  }
}
