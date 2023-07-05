import { Action } from '@ngrx/store';
import { taskInterface } from 'src/types/task';

export enum TaskActionType {
  ADD_ITEM = '[TASK] Add TASK',
}

export class AddTaskAction implements Action {

  readonly type = TaskActionType.ADD_ITEM;
  constructor(public payload: taskInterface) {}

}

export type TaskAction = AddTaskAction;