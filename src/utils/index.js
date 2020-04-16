import {RENDER_POSITION} from 'const';

const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

export const formatTime = (date) => {
  const hours = castTimeFormat(date.getHours() % 12);
  const minutes = castTimeFormat(date.getMinutes());

  return `${hours}:${minutes}`;
};

export const createNode = (template) => {
  const node = document.createElement(`div`);
  node.innerHTML = template;

  return node.firstChild;
};

export const render = (container, element, location) => {
  switch (location) {
    case RENDER_POSITION.AFTERBEGIN:
      container.prepend(element);
      break;
    case RENDER_POSITION.BEFOREEND:
      container.append(element);
      break;
  }
};
