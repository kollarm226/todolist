export class Task {
  id!: string;
  ListID!: string;
  name!: string;
  isDone: boolean = false;
  priority!: number;
  isDeleted: boolean = false;

  constructor(init?: Partial<Task>) {
    Object.assign(this, init);
  }
}
