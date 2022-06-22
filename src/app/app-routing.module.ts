import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoneListComponent } from './components/done-list/done-list.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { TodoDetailComponent } from './components/todo-detail/todo-detail.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';

const routes: Routes = [
  {path:'active', component:TodoListComponent},
  {path:'done', component:DoneListComponent},
  {path:'todo/:id', component:TodoDetailComponent},
  {path:'todo', component:TodoDetailComponent},
  {path:'', redirectTo:'/active', pathMatch:'full'},
  {path:'**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
