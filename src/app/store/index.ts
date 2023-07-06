import { createSelector } from '@ngrx/store';
import { taskInterface } from 'src/types/task';
 
 
 
export const allTasks = createSelector(((state: taskInterface[]) => state), (tasks:taskInterface[]) => tasks);
export const doneTasks = createSelector(((state: taskInterface[]) => state), (tasks:taskInterface[])=>tasks.filter(task=>task.isDone));