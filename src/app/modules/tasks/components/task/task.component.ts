import { Component, OnInit } from '@angular/core';
import { Task } from 'src/types/task';
import { Observable } from 'rxjs';
import { TasksService } from '../../tasks.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  task$!: Observable<Task>;

  constructor(private tasksService: TasksService, private route: ActivatedRoute, private location: Location){}

  ngOnInit() {
    const taskId = this.route.snapshot.paramMap.get('id');
    if(!taskId) return;

    this.task$ = this.tasksService.getTaskById(taskId);
  }

  onBack(): void{
    this.location.back();
  }
}
