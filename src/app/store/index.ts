import { createSelector } from '@ngrx/store';
import { taskInterface } from 'src/types/task';
 
export interface AppState {
  tasks: taskInterface[];
}
 
export const selectFeature = (state: AppState) => state.tasks;
 
export const selectFeatureCount = createSelector(
  selectFeature,
  (state: taskInterface[]) => state
);