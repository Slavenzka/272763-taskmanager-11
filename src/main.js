import TaskEditComponent from './components/task-form';
import TaskComponent from './components/task-card';
import TasksComponent from './components/tasks';
import FilterComponent from './components/filter';
import BoardComponent from './components/board';
import LoadMoreButtonComponent from './components/button-more';
import SiteMenuComponent from './components/menu';
import SortingComponent from './components/sort';
import NoTasksComponent from './components/no-tasks';
import {render} from './utils';
import {generateFilters} from './mock/filter';
import {generateTasks} from './mock/task';
import {CARDS_QTY, RENDER_POSITION, SHOWING_TASKS_COUNT_ON_START} from './const';

export const renderTask = (taskListElement, task) => {
  const taskComponent = new TaskComponent(task);
  taskComponent.getElement();

  const taskEditComponent = new TaskEditComponent(task);
  taskEditComponent.getElement();

  taskComponent.editClickHandler(taskListElement, taskEditComponent);
  taskEditComponent.addSubmitHandler(taskListElement, taskComponent);
  taskEditComponent.addEscHandler(taskListElement, taskComponent, taskEditComponent);

  render(taskListElement, taskComponent.getElement());
};

const renderBoard = (boardComponent, tasks) => {
  const isAllTasksArchived = tasks.every((task) => task.isArchive);

  if (isAllTasksArchived) {
    render(boardComponent.getElement(), new NoTasksComponent().getElement());
    return;
  }

  render(boardComponent.getElement(), new SortingComponent().getElement(), RENDER_POSITION.AFTERBEGIN);
  render(boardComponent.getElement(), new TasksComponent().getElement());

  const tasksContainer = boardComponent.getElement().querySelector(`.board__tasks`);

  tasks.slice(0, SHOWING_TASKS_COUNT_ON_START)
    .forEach((task) => {
      renderTask(tasksContainer, task);
    });

  const loadMoreButton = new LoadMoreButtonComponent(tasks);
  render(boardComponent.getElement(), loadMoreButton.getElement());
  loadMoreButton.setClickHandler(tasksContainer);
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const tasks = generateTasks(CARDS_QTY);
const filters = generateFilters();

render(siteHeaderElement, new SiteMenuComponent().getElement());
render(siteMainElement, new FilterComponent(filters).getElement());

const boardComponent = new BoardComponent();
render(siteMainElement, boardComponent.getElement());
renderBoard(boardComponent, tasks);
