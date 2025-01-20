export class Todo {
  id?: string;
  ListID!: string;
  name!: string;
  isDone: boolean = false;
  priority!: number;
  isDeleted: boolean = false;

  constructor(init?: Partial<Todo>) {
    Object.assign(this, init);
  }
}
