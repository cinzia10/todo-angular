import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { TodoClass } from 'src/app/model/todo-class';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit, AfterViewInit, OnDestroy {
  todosArray: TodoClass[] = [];

  constructor(private dataServ: DataService, private apiServ: ApiService) {
    dataServ.getActiveTodos().subscribe({
      next: (todos) => (this.todosArray = todos),
      error: (err) => console.log(err),
    });
  }

  refreshArray() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {}

  manageTodoEmission(todo: TodoClass): void {
    this.dataServ.completeTodo(todo).subscribe({
      next: (res) => console.log('result', res),
      error: (err) => console.log(err),
    });
  }

  /// FUNZIONE CHE RIORDINA I TODO PER NOME
  orderByName() {
    this.todosArray.sort(TodoClass.compareByName);
  }

  /// FUZIONE CHE RIORDINA I TODO PER DATA
  orderByDate() {
    this.todosArray.sort(TodoClass.compareByDate);
  }

  /// FUNZIONE CHE RIORDINA I TODO PER PRIORITA'
  orderByPriority() {
    this.todosArray.sort(TodoClass.compareByPriority);
  }
}
