import {createTaskFormTemplate} from './components/task-form';
import {createTaskCardTemplate} from './components/task-card';
import {createFilterTemplate} from './components/filter';
import {createBoardTemplate} from './components/board';
import {createButtonMore} from './components/button-more';
import {createSiteMenuTemplate} from './components/menu';
import {render} from './utils';
import {generateFilters} from './mock/filter';
import {generateTasks} from './mock/task';

const CARDS_QTY = 3;

const renderTasks = (tasksContainer, tasksQty, taskData) => {
  render(tasksContainer, createTaskFormTemplate(taskData[0]));

  for (let i = 1; i < taskData.length; i++) {
    render(tasksContainer, createTaskCardTemplate(taskData[i]));
  }
};

const renderContent = (mainElement) => {
  const filters = generateFilters();
  const tasks = generateTasks(CARDS_QTY);

  render(mainElement, createFilterTemplate(filters));
  render(mainElement, createBoardTemplate());

  const boardContainer = siteMainElement.querySelector(`.board`);
  const boardTasksContainer = siteMainElement.querySelector(`.board__tasks`);

  renderTasks(boardTasksContainer, CARDS_QTY, tasks);
  render(boardContainer, createButtonMore());
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, createSiteMenuTemplate());
renderContent(siteMainElement);
