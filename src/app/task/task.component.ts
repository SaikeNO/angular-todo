import { Component, OnInit } from '@angular/core';
import { taskInterface } from 'src/types/task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  task: taskInterface = {
    id: '',
    title: '',
    description: '',
    date: new Date(),
  };
  ngOnInit() {
    this.task = history.state;
  }
}
