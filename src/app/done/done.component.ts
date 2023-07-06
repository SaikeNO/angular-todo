import { Component, OnInit } from '@angular/core';

import { taskInterface } from 'src/types/task';
import { TasksService } from '../services/task.service';

@Component({
  selector: 'app-done',
  templateUrl: './done.component.html',
  styleUrls: ['./done.component.scss']
})

export class DoneComponent implements OnInit {
  doneTaskList: taskInterface[] = [];
  constructor(private tasksService: TasksService){}

  ngOnInit(): void {
    this.tasksService.taskEmitter.subscribe((data) => this.doneTaskList = data.filter(task=>task.isDone));
  }

  onDeleteClick(id: string): void{
    this.tasksService.removeTask(id)
  }
}
