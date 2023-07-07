import { Component } from '@angular/core';

import { Message } from 'primeng/api';
import { TasksService } from '../services/task.service';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent {
  title: string = "";
  description: string = "";
  date: Date = new Date();
  messages: Message[] = [];
  isError: boolean = false;

  constructor(private tasksService: TasksService){}

  onSubmit():void{
    if(!this.title){
      this.messages = [{ severity: 'error', summary: 'Error', detail: 'One or more fields are required' }];
      this.isError = true;
      return;
    }
    this.tasksService.addTask(this.title, this.description, this.date);

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
