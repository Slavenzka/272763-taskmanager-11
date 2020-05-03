import BoardComponent from './components/board';
import SiteMenuComponent from './components/menu';
import {render} from './utils/render';
import {generateTasks} from './mock/task';
import {CARDS_QTY} from './const';
import BoardController from './controllers/board';
import TasksModel from './models/tasks';
import FilterController from './controllers/filter';
import {MenuItem} from './components/menu';

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const tasks = generateTasks(CARDS_QTY);
const tasksModel = new TasksModel();
tasksModel.setTasks(tasks);

const siteMenuComponent = new SiteMenuComponent();
render(siteHeaderElement, siteMenuComponent);

const filterController = new FilterController(siteMainElement, tasksModel);
filterController.render();

const boardComponent = new BoardComponent();
render(siteMainElement, boardComponent);

const boardController = new BoardController(boardComponent, tasksModel);
boardController.render(tasks);

siteMenuComponent.setOnChange((menuItem) => {
  switch (menuItem) {
    case MenuItem.NEW_TASK:
      siteMenuComponent.setActiveItem(MenuItem.NEW_TASK);
      boardController.createTask();
      break;
  }
});
