import { Component, OnInit } from '@angular/core';

import { taskInterface } from 'src/types/task';
import { Store } from '@ngrx/store';
import * as TaskActions from '../store/task.actions';
import * as fromRoot from '../store/index';

@Component({
  selector: 'app-done',
  templateUrl: './done.component.html',
  styleUrls: ['./done.component.scss']
})

export class DoneComponent implements OnInit {
  tasks: taskInterface[] = [];
  title: string = "";
  constructor(private store: Store<taskInterface[]>) {}

  ngOnInit(): void {
    this.store.select(fromRoot.doneTasks).subscribe(tasks=>this.tasks = tasks);
  }

  onDeleteClick(id: string): void{
    this.store.dispatch(TaskActions.removeTask({id}))
  }
}
