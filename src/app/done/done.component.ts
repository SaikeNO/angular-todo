import { Component, OnInit } from '@angular/core';

import { taskInterface } from 'src/types/task';
import { TasksService } from '../services/task.service';

@Component({
  selector: 'app-done',
  templateUrl: './done.component.html',
  styleUrls: ['./done.component.scss']
})

export class DoneComponent implements OnInit {
  taskList: taskInterface[] = [];
  constructor(private taskService: TasksService){}

  ngOnInit(): void {
    this.taskList = this.taskService.doneTaskList;
  }

  onDeleteClick(id: string): void{
    this.taskService.removeTask(id)
  }
}
