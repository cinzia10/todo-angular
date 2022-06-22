import { Component, OnInit } from '@angular/core';
import { TodoClass, TodoPriority } from './model/todo-class';
import { fromPriorityToColor, fromPriorityToDescr, TodoInterface } from './model/todo-interface';
import { TODOS, TODOS2, TODOS_I } from './model/todos-mock';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'todo-angular';
  // todosArray: TodoClass[];

  constructor(){}



  ngOnInit(): void {}
}
