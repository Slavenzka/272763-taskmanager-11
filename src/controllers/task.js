import TaskComponent from '../components/task-card';
import TaskEditComponent from '../components/task-form';
import {render, replace} from '../utils/render';

export default class TaskController {
  constructor(container, onDataChange) {
    this._container = container;
    this._onDataChange = onDataChange;

    this._taskComponent = null;
    this._taskEditComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(task) {
    const oldTaskComponent = this._taskComponent;
    const oldTaskEditComponent = this._taskEditComponent;

    this._taskComponent = new TaskComponent(task);
    this._taskEditComponent = new TaskEditComponent(task);

    this._taskComponent.setEditClickHandler(() => {
      this._replaceTaskToEdit();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._taskComponent.setFavoritesClickHandler(() => {
      this._onDataChange(task, Object.assign({}, task, {
        isFavorite: !task.isFavorite
      }));
    });

    this._taskComponent.setArchiveClickHandler(() => {
      this._onDataChange(task, Object.assign({}, task, {
        isArchive: !task.isArchive
      }));
    });

    this._taskEditComponent.addSubmitHandler((evt) => {
      evt.preventDefault();
      this._replaceEditToTask();
    });

    if (oldTaskEditComponent && oldTaskComponent) {
      replace(this._taskComponent, oldTaskComponent);
      replace(this._taskEditComponent, oldTaskEditComponent);
    } else {
      render(this._container, this._taskComponent);
    }
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
