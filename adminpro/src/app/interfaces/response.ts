interface CommonResponse {
  ok: boolean;
  message: string;
}

export interface RegisterResponse extends CommonResponse {
  token?: string;
}
