import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store';
import { AddTaskAction } from '../store/task.actions';
import { Message } from 'primeng/api';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {
  title: string = "";
  description: string = "";
  date: Date = new Date();
  messages: Message[] = [];
  isError: boolean = false;
  constructor(private store: Store<AppState>){}

  onSubmit():void{
    if(!this.title){
      this.messages = [{ severity: 'error', summary: 'Error', detail: 'One or more fields are required' }];
      this.isError = true;
      return;
    }

    this.store.dispatch(
      new AddTaskAction({
        id: Math.random().toString(16),
        title: this.title,
        description: this.description,
        date: this.date,
      })
    );

    this.messages = [{ severity: 'success', summary: 'Success', detail: `${this.title } added successfully` }];
    this.title = "";
    this.description = "";
    this.date = new Date();
  }

  onInputChange():void{
    this.messages = [];
    this.isError = false;
  }
}
