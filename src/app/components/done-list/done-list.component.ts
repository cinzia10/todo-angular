import { Component, OnInit } from '@angular/core';
import { TodoClass } from 'src/app/model/todo-class';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-done-list',
  templateUrl: './done-list.component.html',
  styleUrls: ['./done-list.component.scss']
})
export class DoneListComponent implements OnInit {

  todosArray: TodoClass[] = [];

  constructor(private dataServ: DataService) {
    dataServ.getDoneTodos().subscribe({
      next: todos => this.todosArray = todos,
      error: err => console.log(err)
    })
  }

  ngOnInit(): void {
  }

  /// FUNZIONE CHE ELEMINA IL TODO DALL'ARRAY
  manageTodoDelete(todo: TodoClass) {
    this.dataServ.removeTodo(todo).subscribe({
      next: res => console.log(res),
      error: err => console.log(err)
    });
  }

  /// FUNZIONE CHE ORDINA I TODO PER NOME
  orderByName() {
    this.todosArray.sort(TodoClass.compareByName);
  }

  /// FUNZIONE CHE ORDINA I TODO PER DATA
  orderByDate() {
    this.todosArray.sort(TodoClass.compareByDate);
  }
}
