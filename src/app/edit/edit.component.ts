import { Component, OnInit } from '@angular/core';

import { Message } from 'primeng/api';
import { TasksService } from '../services/task.service';
import { ITask } from 'src/types/task';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  messages: Message[] = [];
  isError = false;
  task!: ITask;

  constructor(private tasksService: TasksService) {}

  ngOnInit() {
    this.task = history.state;
  }

  onSubmit(): void {
    if (!this.task.title) {
      this.messages = [
        {
          severity: 'error',
          summary: 'Error',
          detail: 'One or more fields are required',
        },
      ];
      this.isError = true;
      return;
    }
    this.tasksService.updateTask(this.task);

    this.messages = [
      {
        severity: 'success',
        summary: 'Success',
        detail: `${this.task.title} updated successfully`,
      },
    ];
  }

  onInputChange(): void {
    this.messages = [];
    this.isError = false;
  }
}
