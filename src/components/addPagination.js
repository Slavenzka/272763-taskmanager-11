import {render} from '../utils';
import {createTaskCardTemplate} from '../components/task-card';
import {SHOWING_TASKS_COUNT_BY_BUTTON} from '../const';

export const addPagination = (button, tasks, taskCount) => {
  const boardTasksContainer = document.querySelector(`.board__tasks`);
  const prevTaskCount = taskCount;

  const next = () => {
    taskCount += SHOWING_TASKS_COUNT_BY_BUTTON;

    tasks
      .slice(prevTaskCount, taskCount)
      .forEach((task) => render(boardTasksContainer, createTaskCardTemplate(task)));
  };

  const isAllElementsLoaded = () => {
    if (taskCount >= tasks.length) {
      button.remove();
    }
  };

  button.addEventListener(`click`, () => {
    next();
    isAllElementsLoaded();
  });
};
