import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'tasks', redirectTo: '/tasks/undone', pathMatch: 'full' },
  { path: '', redirectTo: '/tasks/undone', pathMatch: 'full' },
  {
    path: 'tasks',
    loadChildren: () =>
      import('./modules/tasks/tasks.module').then((mod) => mod.TaskModule),
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
