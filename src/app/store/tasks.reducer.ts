import { createReducer, on } from '@ngrx/store';
import { taskInterface } from 'src/types/task';
import * as TasksAction from '../store/task.actions'

const initialState: taskInterface[] = [
  {
    id: '1',
    title: 'Angular State Management with NgRx',
    description: 'Chameera Dulanga',
    date: new Date(),
    isDone: false,
  },
];

export const taskReducer = createReducer(
  initialState,
  on(TasksAction.addTask, (state, {task}) => [...state, task]),
  on(TasksAction.removeTask, (state, {id}) => state.filter(prevState => prevState.id !== id)),
  on(TasksAction.doneTask, (state, {id}) => state.map(el => el.id !== id ? el : {...el, isDone: true})) //! Skonczyc przenoszenie taska do done. Zrobic selector w store index.ts do nie done taskow
) 
