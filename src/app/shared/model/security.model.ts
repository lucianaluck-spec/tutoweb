export class AuthenticateRequestDTO {
  constructor(public username: string, public password: string) {}
}

export class RenewTokenRequestDTO {
  constructor(public token: string) {}
}

export class TokenResponseDTO {
  token?: String;
  expiration?: Date;
  idUsuario?: number;
}

export class AuthenticatedUser {

  constructor(public username: string, public issued: Date,
    public expiration: Date, public token: string) {}

    picture?: string;
    email?: string;
    createdAt?: Date;
    nome?: string;
    supervisao?: boolean;
    idIntegrante?: number;
}
