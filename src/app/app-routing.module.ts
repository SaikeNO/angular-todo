import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';
import { TaskComponent } from './task/task.component';
import { AddComponent } from './add/add.component';
import { DoneComponent } from './done/done.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'tasks', component: TasksComponent },
  { path: 'tasks/add', component: AddComponent },
  { path: 'tasks/done', component: DoneComponent },
  { path: 'tasks/:id', component: TaskComponent },
  { path: 'tasks/:id/edit', component: AddComponent },
  { path: '',   redirectTo: '/tasks', pathMatch: 'full' },
  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
