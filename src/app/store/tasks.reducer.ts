import { taskInterface } from 'src/types/task';
import { TaskAction, TaskActionType } from './task.actions';

const initialState: taskInterface[] = [
  {
    id: '1',
    title: 'Angular State',
    description: 'Angular State Management with NgRx',
    date: new Date,
},
];

export function TaskReducer(
   state: taskInterface[] = initialState,
   action: TaskAction
) {
   switch (action.type) {
     case TaskActionType.ADD_ITEM:
       return [...state, action.payload];
     default:
       return state;
   }
}
