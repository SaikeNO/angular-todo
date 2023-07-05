import { Component } from '@angular/core';
import { taskInterface } from 'src/types/task';
import { Store } from '@ngrx/store';
import { AppState } from '../store';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  providers: [MessageService],
})
export class EditComponent {
  tasks!: taskInterface[];
  title!: string;

  constructor(
    private store: Store<AppState>,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.store
      .select((store) => store.tasks)
      .subscribe((tasks) => (this.tasks = [...tasks]));
  }

  clonedTasks: { [s: string]: taskInterface } = {};

  onRowEditInit(task: taskInterface) {
    this.clonedTasks[task.id as string] = { ...task };
  }

  onRowEditSave(task: taskInterface) {
    if (task.title) {
      delete this.clonedTasks[task.id as string];
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Task is updated',
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Task title is required',
      });
    }
  }

  onRowEditCancel(task: taskInterface, index: number) {
    this.tasks[index] = this.clonedTasks[task.id as string];
    delete this.clonedTasks[task.id as string];
  }
}
