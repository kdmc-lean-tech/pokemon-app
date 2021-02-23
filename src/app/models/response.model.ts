
export interface Response<T> {
  status: number;
  body: BodyResponse<T>;
  messages: string;
}

export interface BodyResponse<T> {
  results: T[];
}
