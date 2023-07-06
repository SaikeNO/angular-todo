import { Component } from '@angular/core';

import { Message } from 'primeng/api';
import { TasksService } from '../services/task.service';
import { ITask } from 'src/types/task';
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

    const newTask: ITask = {
      id: Math.floor(Math.random() * 1000).toString(16),
      title: this.title,
      description: this.description,
      date: this.date,
      isDone: false,
    } 

    this.tasksService.addTask(newTask);

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
