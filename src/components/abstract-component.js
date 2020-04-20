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

  createNode(template) {
    const node = document.createElement(`div`);
    node.innerHTML = template;
    return node.firstChild;
  }

  getElement() {
    if (!this._element) {
      this._element = this.createNode(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    if (this._element) {
      this._element.remove();
      this._element = null;
    }
  }
}
