import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { TasksService } from '../services/task.service';
import { Dictionary } from 'src/types/dictionary';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})

export class TasksComponent {
  dictionaryList$!: Observable<Dictionary[]>;

  constructor(private tasksService: TasksService) {
    this.dictionaryList$ = this.tasksService.getUnDoneDictionaries();
  }

  onDoneClick(id: string): void {
    this.tasksService.doneTask(id);
  }
}
