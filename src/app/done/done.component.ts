import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';

import { ITask } from 'src/types/task';
import { TasksService } from '../services/task.service';

@Component({
  selector: 'app-done',
  templateUrl: './done.component.html',
  styleUrls: ['./done.component.scss'],
})

export class DoneComponent  {
  doneTaskList$!: Observable<ITask[]>;

  constructor(private tasksService: TasksService) {
    this.doneTaskList$ = this.tasksService.getDoneTasks();
  }

  onDeleteClick(id: string): void {
    this.tasksService.removeTask(id);
  }
}
