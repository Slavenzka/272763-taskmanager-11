import {RENDER_POSITION} from '../const';

export const createNode = (template) => {
  const node = document.createElement(`div`);
  node.innerHTML = template;
  return node.firstChild;
};

export const render = (container, element, location = RENDER_POSITION.BEFOREEND) => {
  switch (location) {
    case RENDER_POSITION.AFTERBEGIN:
      container.prepend(element);
      break;
    case RENDER_POSITION.BEFOREEND:
      container.append(element);
      break;
  }
};

export const replace = (parent, newElement, oldElement) => {
  parent.replaceChild(newElement, oldElement);
};

export const remove = (node) => {
  node.remove();
};
