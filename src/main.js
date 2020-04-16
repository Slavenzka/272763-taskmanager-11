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
import {CARDS_QTY, SHOWING_TASKS_COUNT_ON_START} from './const';
import {addPagination} from './components/addPagination';

const renderContent = (mainElement) => {
  const renderTasks = (tasksContainer, tasksQty, taskData) => {
    render(tasksContainer, createTaskFormTemplate(taskData[0]));

    taskData.slice(1, tasksQty).forEach((task) => render(tasksContainer, createTaskCardTemplate(task)));
  };

  render(mainElement, createFilterTemplate(filters));
  render(mainElement, createBoardTemplate());

  const boardContainer = siteMainElement.querySelector(`.board`);
  const boardTasksContainer = siteMainElement.querySelector(`.board__tasks`);

  renderTasks(boardTasksContainer, showingTaskCount, tasks);
  render(boardContainer, createButtonMore());

  const loadMoreButton = boardContainer.querySelector(`.load-more`);
  addPagination(loadMoreButton, tasks, showingTaskCount);
};

const renderTask = () => {};

const renderBoard = () => {};

let showingTaskCount = SHOWING_TASKS_COUNT_ON_START;
const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const filters = generateFilters();
const tasks = generateTasks(CARDS_QTY);

render(siteHeaderElement, new SiteMenuComponent().getElement());
render(siteMainElement, new FilterComponent(filters).getElement());
