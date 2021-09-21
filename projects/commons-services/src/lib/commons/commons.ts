export class BaseEntity<T> {
  id!: T;
}

export class ErrorInfo {
  code!: number;
  message!: string;
  data?: { [key: string]: any };
}

export class ErrorResponse {
  error!: ErrorInfo;
}
