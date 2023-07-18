import { Component } from '@angular/core';
import { Task } from 'src/types/task';
import { Observable, catchError } from 'rxjs';
import { TasksService } from '../../tasks.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Message } from 'src/app/shared/message/message';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent extends Message {
  task$!: Observable<Task>;

  constructor(
    private tasksService: TasksService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    super();
    const taskId = this.route.snapshot.paramMap.get('id');

    if (taskId) {
      this.task$ = this.tasksService
        .getTaskById(taskId)
        .pipe(catchError((error) => this.handleError(error)));
    }
  }

  onBack(): void {
    this.location.back();
  }
}
