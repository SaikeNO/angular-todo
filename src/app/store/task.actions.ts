import { createAction, props } from '@ngrx/store';
import { taskInterface } from 'src/types/task';

export enum TaskActionType {
  ADD_ITEM = '[TASK] Add TASK',
  REMOVE_ITEM = '[TASK] Remove TASK',
  DONE_ITEM = '[TASK] Done TASK',
}

export const addTask = createAction(TaskActionType.ADD_ITEM, props<{task:taskInterface}>())

export const removeTask = createAction(TaskActionType.REMOVE_ITEM, props<{id:string}>())

export const doneTask = createAction(TaskActionType.DONE_ITEM, props<{id:string}>())