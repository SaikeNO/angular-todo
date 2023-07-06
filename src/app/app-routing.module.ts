import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';
import { TaskComponent } from './task/task.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { DoneComponent } from './done/done.component';

const routes: Routes = [
  { path: 'tasks', component: TasksComponent },
  { path: 'tasks/:id', component: TaskComponent },
  { path: 'add', component: AddComponent },
  { path: 'edit', component: EditComponent },
  { path: 'done', component: DoneComponent },
  { path: '',   redirectTo: '/tasks', pathMatch: 'full' },
  { path: '**', redirectTo: '/tasks' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
