import { Component, OnInit } from '@angular/core';
import { Task } from 'src/types/task';
import { Observable } from 'rxjs';
import { TasksService } from '../services/task.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  task$!: Observable<Task>;

  constructor(private tasksService: TasksService, private route: ActivatedRoute){}

  ngOnInit() {
    const taskId = this.route.snapshot.paramMap.get('id');
    if(!taskId) return;

    this.task$ = this.tasksService.getTaskById(taskId);
  }
}
