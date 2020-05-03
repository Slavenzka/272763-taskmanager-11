import BoardComponent from './components/board';
import SiteMenuComponent from './components/menu';
import {render} from './utils/render';
import {generateTasks} from './mock/task';
import {CARDS_QTY} from './const';
import BoardController from './controllers/board';
import TasksModel from './models/tasks';
import FilterController from './controllers/filter';

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const tasks = generateTasks(CARDS_QTY);
const tasksModel = new TasksModel();
tasksModel.setTasks(tasks);
render(siteHeaderElement, new SiteMenuComponent());

const filterController = new FilterController(siteMainElement, tasksModel);
filterController.render();

const boardComponent = new BoardComponent();
const controller = new BoardController(boardComponent, tasksModel);

render(siteMainElement, boardComponent);
controller.render(tasks);
