import TaskEdit from './components/task-form';
import Task from './components/task-card';
import Tasks from './components/tasks';
import Filter from './components/filter';
import Board from './components/board';
import LoadMoreButton from './components/button-more';
import SiteMenu from './components/menu';
import Sorting from './components/sort';
import {render} from './utils';
import {generateFilters} from './mock/filter';
import {generateTasks} from './mock/task';
import {CARDS_QTY, SHOWING_TASKS_COUNT_ON_START} from './const';
import {addPagination} from './components/addPagination';

const renderContent = (mainElement) => {
  const filters = generateFilters();

  let showingTaskCount = SHOWING_TASKS_COUNT_ON_START;
  const tasks = generateTasks(CARDS_QTY);

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

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, createSiteMenuTemplate());
renderContent(siteMainElement);
