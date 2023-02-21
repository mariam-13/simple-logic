export interface IUser {
  id?: number;
  name: string;
  lastname: string;
  email: string;
  password: string;
  highScore?: number;
  isAdmin?: boolean;
}
