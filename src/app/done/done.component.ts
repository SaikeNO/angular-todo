import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ITask } from 'src/types/task';
import { TasksService } from '../services/task.service';

@Component({
  selector: 'app-done',
  templateUrl: './done.component.html',
  styleUrls: ['./done.component.scss']
})

export class DoneComponent implements OnInit, OnDestroy {
  doneTaskList!: ITask[];
  taskSubscription?: Subscription;

  constructor(private tasksService: TasksService){}

  ngOnInit(): void {
    this.tasksService.taskEmitter.subscribe((data) => this.doneTaskList = data.filter(task=>task.isDone));
  }

  onDeleteClick(id: string): void{
    this.tasksService.removeTask(id)
  }

  ngOnDestroy(): void {
    if(this.taskSubscription){
      this.taskSubscription.unsubscribe();
    }
  }
}
