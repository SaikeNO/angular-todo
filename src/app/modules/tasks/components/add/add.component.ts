import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { Message } from 'primeng/api';
import { TasksService } from '../../tasks.service';
import { Task } from 'src/types/task';
import { ActivatedRoute } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

interface Form
  extends FormGroup<{
    title: FormControl<string>;
    description: FormControl<string>;
    date: FormControl<Date>;
  }> {}
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
  form: Form = this.fb.group({
    title: ['', Validators.required],
    description: '',
    date: [new Date(), Validators.required],
  });

  constructor(
    private tasksService: TasksService,
    private fb: NonNullableFormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
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

  handleError(error = { statusText: 'One or more fields are required' }) {
    this.messages = [
      {
        severity: 'error',
        summary: 'Error',
        detail: error.statusText,
      },
    ];
    return throwError(() => new Error(error.statusText));
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
