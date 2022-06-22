import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { TodoClass } from '../model/todo-class';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  getTodosFromDb(){
    const url = 'https://628b2f12667aea3a3e290de6.mockapi.io/todos';
    return this.http.get<TodoClass[]>(url).pipe(
      map(dbObjects => this.convertToTodoClass(dbObjects)),
    );
  }

  convertToTodoClass(dbObjectArray: any[]) {
    const todoArray = [];
    for (const dbObject of dbObjectArray) {
      const newTodo = TodoClass.fromDbObj(dbObject);
      todoArray.push(newTodo);
    }
    return todoArray;
  }
}
