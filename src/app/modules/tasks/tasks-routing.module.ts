import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksComponent } from './components/tasks/tasks.component';
import { TaskComponent } from './components/task/task.component';
import { AddComponent } from './components/add/add.component';
import { DoneComponent } from './components/done/done.component';
import { UndoneComponent } from './components/undone/undone.component';

const routes: Routes = [
  {
    path: '',
    component: TasksComponent,
    children: [
      { path: 'undone', component: UndoneComponent },
      { path: 'add', component: AddComponent },
      { path: 'done', component: DoneComponent },
      { path: ':id', component: TaskComponent },
      { path: ':id/edit', component: AddComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TasksRoutingModule {}
