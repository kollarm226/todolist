export class List {
  id?: string;
  UserID!: string;
  list_name!: string;
  icon!: number;
  color!: number;

  constructor(init?: Partial<List>) {
    Object.assign(this, init);
  }
}
