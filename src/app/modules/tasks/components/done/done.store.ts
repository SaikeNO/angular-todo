import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { tapResponse } from '@ngrx/component-store';
import { Observable } from 'rxjs';

import { Dictionary } from 'src/types/dictionary';
import { TasksService } from '../../tasks.service';
import { DictionariesStore } from '../../dictionaries.store';

@Injectable()
export class DoneStore extends DictionariesStore {
  constructor(private tasksService: TasksService) {
    super();
  }

  private readonly doneDictionaries$: Observable<Dictionary[]> = this.select(
    (state) => state.dictionaries
  );

  readonly vm$ = this.select(
    this.baseSelect,
    this.doneDictionaries$,
    (state, dictionaries) => ({ ...state, dictionaries })
  );

  readonly getDoneDictionaries = this.effect(() => {
    this.setIsLoading(true);
    return this.tasksService.getDoneDictionaries().pipe(
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

  readonly removeTask = this.updater((state, taskId: string) => {
    this.tasksService.removeTask(taskId).subscribe();
    return {
      ...state,
      dictionaries: state.dictionaries.filter(
        (dictionary) => dictionary._id !== taskId
      ),
    };
  });
}
