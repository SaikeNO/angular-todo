import { taskInterface } from 'src/types/task';
import { ActionReducerMap } from '@ngrx/store';
import { TaskReducer } from './tasks.reducer';


export const rootReducer = {};

export interface AppState {
    tasks: taskInterface[];
};


export const reducers: ActionReducerMap<AppState, any> = {
    tasks: TaskReducer
};