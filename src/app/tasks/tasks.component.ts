import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ITask } from 'src/types/task';
import { TasksService } from '../services/task.service';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit, OnDestroy  {
  taskList!: ITask[];
  taskSubscription?: Subscription;

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    this.taskSubscription = this.tasksService.taskEmitter.subscribe((data) => this.taskList = data.filter(task=>!task.isDone));
  }

  onDoneClick(id: string): void{
    this.tasksService.doneTask(id);
  }

  ngOnDestroy(): void {
    if(this.taskSubscription){
      this.taskSubscription.unsubscribe();
    }
  }
}
