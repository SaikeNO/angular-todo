import { Component } from '@angular/core';

import { Task } from 'src/types/task';
import { TasksService } from '../services/task.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-done',
  templateUrl: './done.component.html',
  styleUrls: ['./done.component.scss'],
})

export class DoneComponent  {
  doneTaskList$!: Observable<Task[]>;

  constructor(private tasksService: TasksService) {
    this.doneTaskList$ = this.tasksService.getDoneTasks();
  }

  onDeleteClick(id: string): void {
    this.tasksService.removeTask(id);
  }
}
