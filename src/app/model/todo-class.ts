export class TodoClass {

  id?: string;
  name: string;
  tags: string[];
  private readonly _creationDate: number;
  priority: TodoPriority;
  private _doneDate?: number;

  constructor(name: string, tags: string[] = [], creationDate: Date = new Date(), priority: TodoPriority = TodoPriority.LOW){
    this.name = name;
    this.tags = tags;
    this._creationDate = creationDate.getTime();
    this.priority = priority;
  }

  get creationDate(): Date{
    return new Date(this._creationDate);
  }

  get doneDate(): Date | null {
    if (this._doneDate) {
      return new Date(this._doneDate);
    } else {
      return null;
    }
  }

  get color(): string{
    return getPriorityColor(this.priority);
  }

  get description(): string{
    return getPriorityString(this.priority);
  }

  done(): void{
    const now = new Date();
    this.priority = TodoPriority.DONE;
    this._doneDate = now.getTime();
  }

  static compareByName(a: TodoClass, b:TodoClass){
    return a.name.localeCompare(b.name);
  }

  static compareByDate(a: TodoClass, b: TodoClass){
    return a._creationDate - b._creationDate;
  }

  static compareByPriority(a: TodoClass, b: TodoClass){
    return b.priority - a.priority;
  }

  static fromDbObj(dbObject: any): TodoClass{
    const todo = new TodoClass(dbObject.name, dbObject.tags, new Date(dbObject.creationDate * 1000), dbObject.priority);
    todo.id = dbObject.id;
    if (dbObject.doneDate) {
      todo._doneDate = dbObject.doneDate * 1000;
    }
    return todo;
  }


}

export enum TodoPriority {
  DONE =  -1,
  LOW = 0,
  MEDIUM = 1,
  HIGH = 2,
  VERYHIGH = 3
}

export function getPriorityColor(priority: TodoPriority): string{
  switch (priority) {
    case TodoPriority.DONE:
      return 'gray';
    case TodoPriority.LOW:
      return 'green'
    case TodoPriority.MEDIUM:
      return 'yellow'
    case TodoPriority.HIGH:
      return 'orange'
    default:
      return 'red'
  }
}

export function getPriorityString(priority: TodoPriority): string {
  switch (priority) {
    case TodoPriority.DONE:
      return 'completato';
    case TodoPriority.LOW:
      return 'bassa'
    case TodoPriority.MEDIUM:
      return 'media'
    case TodoPriority.HIGH:
      return 'alta'
    default:
      return 'molto alta'
  }
}

