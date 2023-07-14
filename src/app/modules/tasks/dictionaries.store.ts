import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';

import { Dictionary } from 'src/types/dictionary';
import { Message } from 'primeng/api';

interface StateModel {
  dictionaries: Dictionary[];
  isLoading: boolean;
  messages: Message[];
}

@Injectable()
export class DictionariesStore extends ComponentStore<StateModel> {
  constructor() {
    super({ dictionaries: [], isLoading: false, messages: [] });
  }

  protected setDictionaries = (dictionaries: Dictionary[]): void =>
    this.patchState({ dictionaries });

  protected setIsLoading = (isLoading: boolean): void =>
    this.patchState({ isLoading });

  protected setMessage = this.updater((state, message: Message) => ({
    ...state,
    messages: [...state.messages, message],
  }));

  private readonly isLoading$ = this.select((state) => state.isLoading);
  private readonly messages$ = this.select((state) => state.messages);

  readonly baseSelect = this.select({
    isLoading: this.isLoading$,
    messages: this.messages$,
  });
}
