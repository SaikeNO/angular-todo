import { Component, OnInit } from '@angular/core';
import { ITask } from 'src/types/task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  task!: ITask;
  ngOnInit() {
    this.task = history.state;
  }
}
