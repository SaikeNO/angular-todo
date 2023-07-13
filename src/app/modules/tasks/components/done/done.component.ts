import { Component } from '@angular/core';

import { TasksService } from '../../tasks.service';
import { Observable, catchError } from 'rxjs';
import { Dictionary } from 'src/types/dictionary';
import { Message } from 'src/app/shared/message/message';

@Component({
  selector: 'app-done',
  templateUrl: './done.component.html',
  styleUrls: ['./done.component.scss'],
})
export class DoneComponent extends Message {
  doneDictionaryList$: Observable<Dictionary[]> = this.tasksService
    .getDoneDictionaries()
    .pipe(catchError((error) => this.handleError(error)));

  constructor(private tasksService: TasksService) {
    super();
  }

  onDeleteClick(id: string): void {
    this.tasksService.removeTask(id);
  }
}
