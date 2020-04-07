import {createTaskFormTemplate} from './components/task-form';
import {createTaskCardTemplate} from './components/task-card';
import {createFilterTemplate} from './components/filter';
import {createBoardTemplate} from './components/board';
import {createButtonMore} from './components/button-more';
import {createSiteMenuTemplate} from './components/menu';
import {render} from './utils';

const CARDS_QTY = 3;

const renderTasks = (tasksContainer, tasksQty) => {
  render(tasksContainer, createTaskFormTemplate());

  for (let i = 0; i < tasksQty; i++) {
    render(tasksContainer, createTaskCardTemplate());
  }
};

const renderContent = (mainElement) => {
  render(mainElement, createFilterTemplate());
  render(mainElement, createBoardTemplate());

  const boardContainer = siteMainElement.querySelector(`.board`);
  const boardTasksContainer = siteMainElement.querySelector(`.board__tasks`);

  renderTasks(boardTasksContainer, CARDS_QTY);
  render(boardContainer, createButtonMore());
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, createSiteMenuTemplate());
renderContent(siteMainElement);
