export const operationErrorCode = "OPERATIONERROR";
export default class OperationError extends Error {
  constructor(message) {
    super(message);
    this.code = operationErrorCode;
  }
}
