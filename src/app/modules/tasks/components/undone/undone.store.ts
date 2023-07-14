import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable, switchMap } from 'rxjs';

import { Dictionary } from 'src/types/dictionary';
import { TasksService } from '../../tasks.service';

@Injectable()
export class UnDoneStore extends ComponentStore<Dictionary[]> {
  constructor(private tasksService: TasksService) {
    super([]);
  }

  readonly unDoneDictionaries$: Observable<Dictionary[]> = this.select(
    (state) => state
  );

  readonly getUnDoneDictionaries = this.effect(
    (params$: Observable<unknown>) => {
      return params$.pipe(
        switchMap(() =>
          this.tasksService.getUnDoneDictionaries().pipe(
            tapResponse(
              (unDoneDictionaries: Dictionary[]) =>
                this.addUnDoneDictionaries(unDoneDictionaries),
              (error: HttpErrorResponse) => {} //! Handle error
            )
          )
        )
      );
    }
  );

  readonly doneTask = this.updater((state, taskId: string) => {
    this.tasksService
      .getTaskById(taskId)
      .subscribe((task) => this.tasksService.doneTask(task).subscribe());
    return state.filter((dictionary) => dictionary.id !== taskId);
  });

  readonly addUnDoneDictionaries = this.updater(
    (state, unDoneDictionaries: Dictionary[]) => unDoneDictionaries
  );
}
