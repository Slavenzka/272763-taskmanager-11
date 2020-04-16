import TaskEditComponent from './components/task-form';
import TaskComponent from './components/task-card';
import TasksComponent from './components/tasks';
import FilterComponent from './components/filter';
import BoardComponent from './components/board';
import LoadMoreButtonComponent from './components/button-more';
import SiteMenuComponent from './components/menu';
import SortingComponent from './components/sort';
import {render} from './utils';
import {generateFilters} from './mock/filter';
import {generateTasks} from './mock/task';
import {CARDS_QTY, RENDER_POSITION, SHOWING_TASKS_COUNT_ON_START} from './const';
// import {addPagination} from './components/addPagination';

export const renderTask = (taskListElement, task) => {
  const onEditButtonClick = () => {
    taskListElement.replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
  };

  const onEditFormSubmit = (evt) => {
    evt.preventDefault();
    taskListElement.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
  };

  const taskComponent = new TaskComponent(task);
  const taskEditButton = taskComponent.getElement().querySelector(`.card__btn--edit`);
  taskEditButton.addEventListener(`click`, onEditButtonClick);

  const taskEditComponent = new TaskEditComponent(task);
  const editForm = taskEditComponent.getElement().querySelector(`form`);
  editForm.addEventListener(`submit`, onEditFormSubmit);

  render(taskListElement, taskComponent.getElement());
};

const renderBoard = (boardComponent, tasks) => {
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
