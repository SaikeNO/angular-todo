import { Component, OnInit } from '@angular/core';
import { Task } from 'src/types/task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  task!: Task;
  ngOnInit() {
    this.task = history.state;
  }
}
