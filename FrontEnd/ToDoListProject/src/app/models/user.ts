export class User {
  id!: string;
  name?: string;
  surname?: string;
  email!: string;
  password!: string;

  constructor(init?: Partial<User>) {
    Object.assign(this, init);
  }
}
