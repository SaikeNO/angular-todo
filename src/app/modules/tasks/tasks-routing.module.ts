import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksComponent } from './components/tasks/tasks.component';
import { TaskComponent } from './components/task/task.component';
import { AddComponent } from './components/add/add.component';
import { DoneComponent } from './components/done/done.component';
import { UndoneComponent } from './components/undone/undone.component';
import { taskGuard } from 'src/app/guard/task.guard';

const routes: Routes = [
  {
    path: '',
    component: TasksComponent,
    children: [
      { path: 'undone', component: UndoneComponent },
      { path: 'add', component: AddComponent },
      { path: 'done', component: DoneComponent },
      { path: ':id', component: TaskComponent, canActivate: [taskGuard] },
      { path: ':id/edit', component: AddComponent, canActivate: [taskGuard] },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TasksRoutingModule {}
