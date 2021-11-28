export default class {
  constructor(message, type = 'success') {
    this.id = new Date().getTime() + Math.random();
    this.message = message;
    this.type = type;
  }
}
