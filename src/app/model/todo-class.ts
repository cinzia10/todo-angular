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


  /// GET CHE RIPRENDE LA CREATION DATE E LA TRASFORMA DA MILLISECONDI A DATA IN FORMATO STANDARD
  get creationDate(): Date{
    return new Date(this._creationDate);
  }

  /// GET CHE RIPRENDE LA DONE DATE, SE ESISTE, E LA TRASFORMA DA MILLISECONDI A DATA IN FORMATO STANDARD
  get doneDate(): Date | null {
    if (this._doneDate) {
      return new Date(this._doneDate);
    } else {
      return null;
    }
  }

  /// GET CHE RIPRENDE IL COLORE DELLA PRIORITA'
  get color(): string{
    return getPriorityColor(this.priority);
  }

  /// GET CHE RIPRENDE LA DESCRIZIONE DELLA PRIORITA'
  get description(): string{
    return getPriorityString(this.priority);
  }

  /// FUNZIONE CHE AGGIUNGE UNA DONE DATE E MODIFICA LA PRIORITA'
  done(): void{
    const now = new Date();
    this._doneDate = now.getTime();
    this.priority = TodoPriority.DONE;
  }

  /// FUNZIONE STATICA DI SORTING CHE RIORDINA PER NOME
  static compareByName(a: TodoClass, b:TodoClass){
    return a.name.localeCompare(b.name);
  }

  /// FUNZIONE STATICA DI SORTING RIORDINA PER DATA
  static compareByDate(a: TodoClass, b: TodoClass){
    return a._creationDate - b._creationDate;
  }

  /// FUNZIONE STATICA DI SORTING RIORDINA PER PRIORITA'
  static compareByPriority(a: TodoClass, b: TodoClass){
    return b.priority - a.priority;
  }

  /// FUNZIONE STATICA CHE TRASFORMA L'OBJECT DI DATABASE IN OBJECT DI CLASSE
  static fromDbObj(dbObject: any): TodoClass{
    const todo = new TodoClass(dbObject.name, dbObject.tags, new Date(dbObject.creationDate * 1000), dbObject.priority);
    todo.id = dbObject.id;
    if (dbObject.doneDate) {
      todo._doneDate = dbObject.doneDate * 1000;
    }
    return todo;
  }

  /// FUNZIONE STATICA CHE TRASFORMA L'OBJECT DI DATABASE IN OBJECT DI CLASSE
  static toDbObj(todo: TodoClass): any{
    const dbObj:any = {};
    dbObj.id = todo.id;
    dbObj.name = todo.name;
    dbObj.tags = todo.tags;
    dbObj.creationDate = todo._creationDate;
    dbObj.priority = todo.priority;
    dbObj.doneDate = todo._doneDate;
    return  dbObj;
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

