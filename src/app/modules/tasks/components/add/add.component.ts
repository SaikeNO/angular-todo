import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { catchError } from 'rxjs';

import { Task } from 'src/types/task';
import { Message } from 'src/app/shared/message/message';
import { TasksService } from '../../tasks.service';

interface Form extends FormGroup<{
  title: FormControl<string>;
  description: FormControl<string>;
  date: FormControl<Date>;
}> {}
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent extends Message {
  task!: Task;
  isEditMode = false;
  isSubmitted = false;
  form: Form = this.fb.group({
    title: ['', Validators.required],
    description: '',
    date: [new Date(), Validators.required],
  });

  constructor(private tasksService: TasksService,private fb: NonNullableFormBuilder,private route: ActivatedRoute) {
    super();
    const taskId = this.route.snapshot.paramMap.get('id');

    if (!taskId) return;

    this.tasksService.getTaskById(taskId).subscribe((task: Task) => {
      const { title, description, date } = task;
      this.form.setValue({ title, description, date });
      this.task = task;
      this.isEditMode = true;
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.handleError();
      this.isSubmitted = true;
      return;
    }

    if (this.isEditMode) {
      this.task = { ...this.task, ...this.form.getRawValue() };

      this.tasksService
        .updateTask(this.task)
        .pipe(catchError((error: HttpErrorResponse) => this.handleError(error)))
        .subscribe(() => this.handleSuccess());
    } else {
      this.tasksService
        .addTask({...this.form.getRawValue(), isDone: false})
        .pipe(catchError((error: HttpErrorResponse) => this.handleError(error)))
        .subscribe(() => {
          this.form.reset();
          this.handleSuccess();
        });
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

  handleSuccess() {
    this.messages = [
      {
        severity: 'success',
        summary: 'Success',
        detail: `${this.form.value.title} ${this.isEditMode ? "updated" : "added"} successfully`,
      },
    ];
  }
}
