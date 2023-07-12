import { Component } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';

import { TasksService } from '../../tasks.service';
import { Dictionary } from 'src/types/dictionary';
import { Message } from 'primeng/api';
@Component({
  selector: 'app-undone',
  templateUrl: './undone.component.html',
  styleUrls: ['./undone.component.scss'],
})
export class UndoneComponent {
  dictionaryList$!: Observable<Dictionary[]>;
  messages: Message[] = [];

  constructor(private tasksService: TasksService) {
    this.dictionaryList$ = this.tasksService.getUnDoneDictionaries().pipe(
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
    );
  }

  onDoneClick(id: string): void {
    this.tasksService.doneTask(id);
  }
}
