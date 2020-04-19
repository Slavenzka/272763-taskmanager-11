export default class AbstractClass {
  constructor() {
    if (new.target === AbstractClass) {
      throw new Error(`Fail on attempt to instantiate abstract class!`);
    }
  }
}
