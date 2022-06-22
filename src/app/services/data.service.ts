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

  getActiveTodos(): Observable<TodoClass[]>{

    return this.todos.pipe(
      map(array => array.filter(todo => todo.doneDate === null))
    )
  }

  getDoneTodos(): Observable<TodoClass[]>{
    return this.todos.pipe(
      map(array => array.filter(todo => todo.doneDate !== null))
    )
  }


  refreshTodos(){
    const newArray = [...this.todos.value]
    this.todos.next(newArray);
  }

  removeTodo(todo: TodoClass){
    const newArray = this.todos.value.filter(t => t !== todo);
    this.todos.next(newArray);
  }

  getTodoById(id:string):Observable<TodoClass | undefined>{
    return this.todos.pipe(
      map(array => array.find(t => t.id === id))
    )
  }

}
