import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';

import { ITask } from 'src/types/task';
import { TasksService } from '../services/task.service';

@Component({
  selector: 'app-done',
  templateUrl: './done.component.html',
  styleUrls: ['./done.component.scss'],
})

export class DoneComponent implements OnInit {
  doneTaskList$!: Observable<ITask[]>;

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    this.doneTaskList$ = this.tasksService.taskEmitter$.pipe(
      map((tasks: ITask[]) => tasks.filter((task) => task.isDone))
    );
  }

  onDeleteClick(id: string): void {
    this.tasksService.removeTask(id);
  }
}
