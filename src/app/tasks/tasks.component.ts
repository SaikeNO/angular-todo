import { Component, OnInit } from '@angular/core';

import { TaskService } from '../tasks.service';
import { taskInterface } from 'src/types/task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit  {
  tasks: taskInterface[] = [];

  constructor(private taskService: TaskService){}

  ngOnInit():void{
    this.taskService.getTasks().subscribe((tasks:taskInterface[]) =>{
      console.log(tasks);
      this.tasks = tasks;
    })
  }
}
