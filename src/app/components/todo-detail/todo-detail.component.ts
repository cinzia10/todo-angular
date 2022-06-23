import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoClass } from 'src/app/model/todo-class';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss'],
})
export class TodoDetailComponent implements OnInit {
  todo?: TodoClass;
  tagsString?: any;

  constructor(private route: ActivatedRoute, private dataServ: DataService) {}

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      this.dataServ.getTodoById(param).subscribe({
        next: (todo) => {
          (this.todo = todo),
            (this.tagsString = todo ? todo.tags.join(' ') : '');
        },
        error: (err) => console.log(err),
      });
    } else {
      this.todo = new TodoClass('');
    }
  }

  saveTodo() {
    if (this.todo) {
      if (this.tagsString === '') {
        this.todo.tags = [];
      } else {
        this.todo.tags = this.tagsString.split(' ');
      }

      if (this.todo.doneDate) {
        this.todo.priority = -1;
      } else {
        if (this.todo.priority < 0) {
          this.todo.priority = 0;
        } else if (this.todo.priority > 3) {
          this.todo.priority = 3;
        }
      }
      this.dataServ.saveTodo(this.todo).subscribe({
        next: res => console.log(res),
        error: err => console.log(err)
      });
    }
  }
}
