import FilterComponent from './components/filter';
import BoardComponent from './components/board';
import SiteMenuComponent from './components/menu';
import {render} from './utils/render';
import {generateFilters} from './mock/filter';
import {generateTasks} from './mock/task';
import {CARDS_QTY} from './const';
import BoardController from './controllers/board';
import TasksModel from './models/tasks';

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const tasks = generateTasks(CARDS_QTY);
const tasksModel = new TasksModel();
tasksModel.setTasks(tasks);
const filters = generateFilters();

render(siteHeaderElement, new SiteMenuComponent());
render(siteMainElement, new FilterComponent(filters));

const boardComponent = new BoardComponent();
const controller = new BoardController(boardComponent, tasksModel);

render(siteMainElement, boardComponent);
controller.render(tasks);
