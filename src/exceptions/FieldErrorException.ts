class FieldErrorException extends Error {
  public status: number;
  public msg: string;
  public path: string;
  constructor(status: number, msg: string, path: string) {
    super();
    this.status = status;
    this.msg = msg;
    this.path = path;
  }
}

export default FieldErrorException;
