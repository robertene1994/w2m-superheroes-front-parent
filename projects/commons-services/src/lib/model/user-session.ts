export class LoginRequest {
  username!: string;
  password!: string;
}

export class LoginResponse {
  username!: string;
  authorization!: string;
}

export class UserSessionData {
  username!: string;
  email!: string;
}

export class TokenData {
  session_data!: UserSessionData;
  iat!: number;
  get iat_date() {
    return this.iat && new Date(this.iat);
  }
}
