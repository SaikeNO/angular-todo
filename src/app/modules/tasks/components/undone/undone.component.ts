import { Component } from '@angular/core';
import { Observable, catchError } from 'rxjs';

import { TasksService } from '../../tasks.service';
import { Dictionary } from 'src/types/dictionary';
import { Message } from 'src/app/shared/message/message';
@Component({
  selector: 'app-undone',
  templateUrl: './undone.component.html',
  styleUrls: ['./undone.component.scss'],
})
export class UndoneComponent extends Message {
  dictionaryList$: Observable<Dictionary[]> = this.tasksService
    .getUnDoneDictionaries()
    .pipe(catchError((error) => this.handleError(error)));

  constructor(private tasksService: TasksService) {
    super();
  }

  onDoneClick(id: string): void {
    this.tasksService.doneTask(id);
  }
}
