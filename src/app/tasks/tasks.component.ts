import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';

import { ITask } from 'src/types/task';
import { TasksService } from '../services/task.service';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})

export class TasksComponent implements OnInit {
  taskList$!: Observable<ITask[]>;

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    this.taskList$ = this.tasksService.taskEmitter$.pipe(
      map((tasks: ITask[]) => tasks.filter((task) => !task.isDone))
    );
  }

  onDoneClick(id: string): void {
    this.tasksService.doneTask(id);
  }
}
