import { Component } from '@angular/core';

import { TasksService } from '../../tasks.service';
import { Observable, catchError, of } from 'rxjs';
import { Dictionary } from 'src/types/dictionary';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-done',
  templateUrl: './done.component.html',
  styleUrls: ['./done.component.scss'],
})

export class DoneComponent  {
  doneDictionaryList$!: Observable<Dictionary[]>;
  messages: Message[] = [];

  constructor(private tasksService: TasksService) {
    this.doneDictionaryList$ = this.tasksService.getDoneDictionaries().pipe(
      catchError((error) => {
        this.messages = [
          {
            severity: 'error',
            summary: 'Error',
            detail: error.statusText,
          },
        ];
        return of([]);
      })
    )
  }

  onDeleteClick(id: string): void {
    this.tasksService.removeTask(id);
  }
}
