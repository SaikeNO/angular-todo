import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { TasksService } from '../services/task.service';
import { Task } from 'src/types/task';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  messages: Message[] = [];
  task!: Task;
  isEditMode = false;
  isSubmitted = false;
  form = this.fb.nonNullable.group({
    title: ['', Validators.required],
    description: '',
    date: [new Date(), Validators.required],
  });

  constructor(private tasksService: TasksService, private fb: FormBuilder) {}

  ngOnInit() {
    this.task = history.state;

    // check if task is passed to state
    if (this.task.title) {
      this.form.setValue({
        title: this.task.title,
        description: this.task.description,
        date: this.task.date,
      });
      this.isEditMode = true;
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.messages = [
        {
          severity: 'error',
          summary: 'Error',
          detail: 'One or more fields are required',
        },
      ];
      this.isSubmitted = true;
      return;
    }

    this.messages = [
      {
        severity: 'success',
        summary: 'Success',
        detail: `${this.form.value.title} ${
          this.isEditMode ? 'updated' : 'added'
        } successfully`,
      },
    ];
    if (this.isEditMode) {
      this.task.title = this.form.value.title ?? '';
      this.task.description = this.form.value.description ?? '';
      this.task.date = this.form.value.date ?? new Date();
      this.tasksService.updateTask(this.task);
    } else {
      const newTask: Task = {
        title: this.form.value.title ?? '',
        description: this.form.value.description ?? '',
        date: this.form.value.date ?? new Date(),
        isDone: false,
      };

      this.tasksService.addTask(newTask);

      this.form.reset();
    }
  }

  isError(): boolean | undefined {
    return (
      this.form.get('title')?.invalid &&
      (this.form.get('title')?.dirty ||
        this.form.get('title')?.touched ||
        this.isSubmitted)
    );
  }

  onInputChange(): void {
    this.messages = [];
    this.isSubmitted = false;
  }
}
