import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store';
import { AddTaskAction } from '../store/task.actions';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {
  title: string = "";

  constructor(private store: Store<AppState>){}

  onSubmit():void{
    this.store.dispatch(
      new AddTaskAction({
        id: Math.random().toString(16),
        title: this.title,
        description: "siemano",
        date: new Date(),
      })
    );
    this.title = "";
  }
}
