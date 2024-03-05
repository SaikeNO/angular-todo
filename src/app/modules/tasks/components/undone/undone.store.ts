import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { tapResponse } from '@ngrx/component-store';
import { Observable } from 'rxjs';

import { Dictionary } from 'src/types/dictionary';
import { TasksService } from '../../tasks.service';
import { DictionariesStore } from '../../dictionaries.store';

@Injectable()
export class UnDoneStore extends DictionariesStore {
  constructor(private tasksService: TasksService) {
    super();
  }

  private readonly unDoneDictionaries$: Observable<Dictionary[]> = this.select(
    (state) => state.dictionaries
  );

  readonly vm$ = this.select(
    this.baseSelect,
    this.unDoneDictionaries$,
    (state, dictionaries) => ({ ...state, dictionaries })
  );

  readonly getUnDoneDictionaries = this.effect(() => {
    this.setIsLoading(true);
    return this.tasksService.getUnDoneDictionaries().pipe(
      tapResponse(
        this.setDictionaries,
        (error: HttpErrorResponse) => {
          this.setMessage({
            severity: 'error',
            summary: 'Error',
            detail: error.message,
          });
          this.setIsLoading(false);
        },
        () => this.setIsLoading(false)
      )
    );
  });

  readonly doneTask = this.updater((state, taskId: string) => {
    this.tasksService
      .getTaskById(taskId)
      .subscribe((task) => this.tasksService.doneTask(task).subscribe());
    return {
      ...state,
      dictionaries: state.dictionaries.filter(
        (dictionary) => dictionary._id !== taskId
      ),
    };
  });
}
