import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';

import { ITask } from 'src/types/task';
import { TasksService } from '../services/task.service';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})

export class TasksComponent {
  taskList$!: Observable<ITask[]>;

  constructor(private tasksService: TasksService) {
    this.taskList$ = this.tasksService.getUnDoneTasks();
  }

  onDoneClick(id: string): void {
    this.tasksService.doneTask(id);
  }
}
