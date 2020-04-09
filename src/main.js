import {createTaskFormTemplate} from './components/task-form';
import {createTaskCardTemplate} from './components/task-card';
import {createFilterTemplate} from './components/filter';
import {createBoardTemplate} from './components/board';
import {createButtonMore} from './components/button-more';
import {createSiteMenuTemplate} from './components/menu';
import {render} from './utils';
import {generateFilters} from './mock/filter';
import {generateTasks} from './mock/task';

const CARDS_QTY = 22;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const renderContent = (mainElement) => {
  const filters = generateFilters();

  let showingTaskCount = SHOWING_TASKS_COUNT_ON_START;
  const tasks = generateTasks(CARDS_QTY);

  const renderTasks = (tasksContainer, tasksQty, taskData) => {
    render(tasksContainer, createTaskFormTemplate(taskData[0]));

    for (let i = 1; i < tasksQty; i++) {
      render(tasksContainer, createTaskCardTemplate(taskData[i]));
    }
  };

  render(mainElement, createFilterTemplate(filters));
  render(mainElement, createBoardTemplate());

  const boardContainer = siteMainElement.querySelector(`.board`);
  const boardTasksContainer = siteMainElement.querySelector(`.board__tasks`);

  renderTasks(boardTasksContainer, showingTaskCount, tasks);
  render(boardContainer, createButtonMore());

  const loadMoreButton = boardContainer.querySelector(`.load-more`);
  loadMoreButton.addEventListener(`click`, () => {
    const prevTaskCount = showingTaskCount;
    showingTaskCount += SHOWING_TASKS_COUNT_BY_BUTTON;

    tasks
      .slice(prevTaskCount, showingTaskCount)
      .forEach((task) => render(boardTasksContainer, createTaskCardTemplate(task)));

    if (showingTaskCount >= tasks.length) {
      loadMoreButton.remove();
    }
  });
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, createSiteMenuTemplate());
renderContent(siteMainElement);
