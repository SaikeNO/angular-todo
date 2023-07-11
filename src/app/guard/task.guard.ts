import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TasksService } from '../modules/tasks/tasks.service';
import {  catchError, map, of } from 'rxjs';

export const taskGuard: CanActivateFn = (route) => {
  const tasksService = inject(TasksService);
  const router = inject(Router);

  const taskId = route.paramMap.get('id');
  if (!taskId) return false;

  return tasksService.getTaskById(taskId).pipe(
    map(task => !!task),
    catchError(() => {
      router.navigate(['/tasks/undone']);
      return of(false);
    })
  );
};
