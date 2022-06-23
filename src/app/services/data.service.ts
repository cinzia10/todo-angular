import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, pipe } from 'rxjs';
import { TodoClass } from '../model/todo-class';
import { ApiService } from './api.service';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  todos: BehaviorSubject<TodoClass[]> = new BehaviorSubject<TodoClass[]>([]);

  constructor(private apiServ: ApiService) {
    this.apiServ.getTodosFromDb().subscribe({
      next: result => this.todos.next(result),
      error: err => console.log(err)
    })
  }

  /// FUNZIONE CHE PRENDE I TODO ATTIVI
  getActiveTodos(): Observable<TodoClass[]>{
    return this.todos.pipe(
      map(array => array.filter(todo => todo.doneDate === null))
    )
  }

  /// FUNZIONE CHE PRENDE I TODO COMPLETATI
  getDoneTodos(): Observable<TodoClass[]>{
    return this.todos.pipe(
      map(array => array.filter(todo => todo.doneDate !== null))
    )
  }

  // FUNZIONE CHE COMUNICA AL DATABASE IL COMPLETAMENTO DEL TODO
  completeTodo(todo: TodoClass):Observable<TodoClass>{
    return this.apiServ.putTodo(todo);
  }

  /// RIMUOVE IL TODO DALL'ARRAY DEI TODO ATTIVI
  removeTodo(todo: TodoClass){
    return this.apiServ.deleteTodo(todo.id!)
  }

  getTodoById(id:string):Observable<TodoClass | undefined>{
    return this.todos.pipe(
      map(array => array.find(t => t.id === id))
    )
  }

  saveTodo(todo: TodoClass):Observable<TodoClass | void>{
    if(todo.id){
      return this.apiServ.putTodo(todo)
    } else {
      return this.apiServ.postTodo(todo).pipe(
        map(t => {
          const newArray = [...this.todos.value, todo];
          this.todos.next(newArray)
        })
      );
    }
  }

}
