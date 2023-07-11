import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { TasksService } from '../../tasks.service';
import { Dictionary } from 'src/types/dictionary';
@Component({
  selector: 'app-undone',
  templateUrl: './undone.component.html',
  styleUrls: ['./undone.component.scss'],
})

export class UndoneComponent {
  dictionaryList$!: Observable<Dictionary[]>;

  constructor(private tasksService: TasksService) {
    this.dictionaryList$ = this.tasksService.getUnDoneDictionaries();
  }

  onDoneClick(id: string): void {
    this.tasksService.doneTask(id);
  }
}
