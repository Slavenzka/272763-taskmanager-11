import TaskComponent from '../components/task-card';
import TaskEditComponent from '../components/task-form';
import {render, replace} from '../utils/render';

export default class TaskController {
  constructor(container) {
    this._container = container;
    this._taskComponent = null;
    this._taskEditComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(task) {
    this._taskComponent = new TaskComponent(task);
    this._taskEditComponent = new TaskEditComponent(task);

    this._taskComponent.getElement();
    this._taskEditComponent.getElement();

    this._taskComponent.setEditClickHandler(() => {
      document.addEventListener(`keydown`, this._onEscKeyDown);
      this._replaceTaskToEdit();
    });

    this._taskComponent.setFavoritesClickHandler(() => {

    });

    this._taskComponent.setArchiveClickHandler(() => {

    });

    this._taskEditComponent.addSubmitHandler((evt) => {
      evt.preventDefault();
      this._replaceEditToTask();
    });

    render(this._container, this._taskComponent);
  }

  _replaceEditToTask() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    replace(this._taskComponent, this._taskEditComponent);
  }

  _replaceTaskToEdit() {
    replace(this._taskEditComponent, this._taskComponent);
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._replaceEditToTask();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}
