import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { Task } from 'src/types/task';
import { TasksService } from '../services/task.service';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})

export class TasksComponent {
  taskList$!: Observable<Task[]>;

  constructor(private tasksService: TasksService) {
    this.taskList$ = this.tasksService.getUnDoneTasks();
  }

  onDoneClick(id: string): void {
    this.tasksService.doneTask(id);
  }
}
