import { Component, OnInit } from '@angular/core';

import { ITask } from 'src/types/task';
import { TasksService } from '../services/task.service';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit  {
  taskList!: ITask[];

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    this.tasksService.taskEmitter.subscribe((data) => this.taskList = data.filter(task=>!task.isDone));
  }

  onDoneClick(id: string): void{
    this.tasksService.doneTask(id);
  }
}
