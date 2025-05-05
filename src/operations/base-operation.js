const defaultOutput = (result) => {
  console.log(result);
};
export default class BaseOperation {
  constructor(key, handler, output = defaultOutput) {
    this.key = key;
    this.handler = handler;
    this.output = output;
  }
}
