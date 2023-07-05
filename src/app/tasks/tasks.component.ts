import { Component, OnInit } from '@angular/core';

import { taskInterface } from 'src/types/task';
import { Store } from '@ngrx/store';
import { AppState } from '../store';
import * as TaskActions from '../store/task.actions';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit  {
  tasks: taskInterface[] = [];
  title: string = "";
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.select((store) => store.tasks).subscribe(tasks=>this.tasks = tasks);
  }

  onDoneClick(id: string): void{
    this.store.dispatch(TaskActions.removeTask({id}))
  }
}
