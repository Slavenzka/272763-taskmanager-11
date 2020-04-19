import {createNode} from '../utils';

export default class AbstractClass {
  constructor() {
    if (new.target === AbstractClass) {
      throw new Error(`Fail on attempt to instantiate abstract class!`);
    }

    this._element = null;
  }

  getTemplate() {
    throw new Error(`Fail on attempt to call abstract method!`);
  }

  getElement() {
    if (!this._element) {
      this._element = createNode(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
