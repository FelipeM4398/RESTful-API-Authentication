export default class MyError extends Error {
  code: string;
  status: number;

  constructor(code: string, message: string, status: number) {
    super();
    this.code = code;
    this.message = message;
    this.status = status;
  }
}
