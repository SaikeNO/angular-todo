import { Component, OnInit } from '@angular/core';

import { taskInterface } from 'src/types/task';
import { Store } from '@ngrx/store';
import * as TaskActions from '../store/task.actions';
import * as fromRoot from '../store/index';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit  {
  tasks: taskInterface[] = [];
  title: string = "";
  constructor(private store: Store<taskInterface[]>) {}

  ngOnInit(): void {
    this.store.select(fromRoot.allTasks).subscribe(tasks=> this.tasks = tasks);
  }

  onDoneClick(id: string): void{
    this.store.dispatch(TaskActions.doneTask({id}))
    console.log(this.tasks)
  }
}
