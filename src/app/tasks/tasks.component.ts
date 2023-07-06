import { Component, OnInit } from '@angular/core';

import { taskInterface } from 'src/types/task';
import { TasksService } from '../services/task.service';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit  {
  taskList!: taskInterface[];

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    this.taskList = this.tasksService.taskList
  }

  onDoneClick(id: string): void{
    this.tasksService.doneTask(id);
  }
}
