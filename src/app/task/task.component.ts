import { Component, OnInit } from '@angular/core';
import { Task } from 'src/types/task';
import { Observable } from 'rxjs';
import { TasksService } from '../services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  task$!: Observable<Task>;

  constructor(private tasksService: TasksService){}

  ngOnInit() {
    this.task$ = this.tasksService.getTaskById(history.state.id);    
  }
}
