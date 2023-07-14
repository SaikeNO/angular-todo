import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable } from 'rxjs';

import { Dictionary } from 'src/types/dictionary';
import { TasksService } from '../../tasks.service';
import { Message } from 'primeng/api';

interface DoneState {
  dictionaries: Dictionary[];
  isLoading: boolean;
  messages: Message[];
}

@Injectable()
export class DoneStore extends ComponentStore<DoneState> {
  constructor(private tasksService: TasksService) {
    super({ dictionaries: [], isLoading: false, messages: [] });
  }

  private setDictionaries = (dictionaries: Dictionary[]): void =>
    this.patchState({ dictionaries });

  private setIsLoading = (isLoading: boolean): void =>
    this.patchState({ isLoading });

  private setMessage = this.updater((state, message: Message) => ({
    ...state,
    messages: [...state.messages, message],
  }));

  private readonly doneDictionaries$: Observable<Dictionary[]> = this.select(
    (state) => state.dictionaries
  );
  private readonly isLoading$ = this.select((state) => state.isLoading);
  private readonly messages$ = this.select((state) => state.messages);

  readonly vm$ = this.select({
    doneDictionaries: this.doneDictionaries$,
    isLoading: this.isLoading$,
    messages: this.messages$,
  });

  readonly getDoneDictionaries = this.effect(() => {
    this.setIsLoading(true);
    return this.tasksService.getDoneDictionaries().pipe(
      tapResponse(
        this.setDictionaries,
        (error: HttpErrorResponse) =>{
          this.setMessage({
            severity: 'error',
            summary: 'Error',
            detail: error.message,
          })
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
        (dictionary) => dictionary.id !== taskId
      ),
    };
  });
}
