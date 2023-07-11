import { Component } from '@angular/core';

import { TasksService } from '../services/task.service';
import { Observable } from 'rxjs';
import { Dictionary } from 'src/types/dictionary';

@Component({
  selector: 'app-done',
  templateUrl: './done.component.html',
  styleUrls: ['./done.component.scss'],
})

export class DoneComponent  {
  doneDictionaryList$!: Observable<Dictionary[]>;

  constructor(private tasksService: TasksService) {
    this.doneDictionaryList$ = this.tasksService.getDoneDictionaries();
  }

  onDeleteClick(id: string): void {
    this.tasksService.removeTask(id);
  }
}
