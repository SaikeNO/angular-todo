import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { TasksService } from '../../tasks.service';
import { Task } from 'src/types/task';
import { ActivatedRoute } from '@angular/router';
import { catchError, throwError } from 'rxjs';
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

  constructor(
    private tasksService: TasksService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const taskId = this.route.snapshot.paramMap.get('id');

    if (!taskId) return;

    this.tasksService.getTaskById(taskId).subscribe((task) => {
      this.form.setValue({
        title: task.title,
        description: task.description,
        date: task.date,
      });
      this.task = task;
      this.isEditMode = true;
    });
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

    if (this.isEditMode) {
      this.task.title = this.form.value.title ?? '';
      this.task.description = this.form.value.description ?? '';
      this.task.date = this.form.value.date ?? new Date();

      this.tasksService
        .updateTask(this.task)
        .pipe(
          catchError((error) => {
            this.messages = [
              {
                severity: 'error',
                summary: 'Error',
                detail: error.statusText,
              },
            ];
            return throwError(()=> new Error(error.statusText));
          })
        )
        .subscribe(() => {
          this.messages = [
            {
              severity: 'success',
              summary: 'Success',
              detail: `${this.form.value.title} updated successfully`,
            },
          ];
        });
    } else {
      const newTask: Task = {
        title: this.form.value.title ?? '',
        description: this.form.value.description ?? '',
        date: this.form.value.date ?? new Date(),
        isDone: false,
      };

      this.tasksService
        .addTask(newTask)
        .pipe(catchError((error) => {
          this.messages = [
            {
              severity: 'error',
              summary: 'Error',
              detail: error.statusText,
            },
          ];
          return throwError(()=> new Error(error.statusText));
        }))
        .subscribe(() => {
          this.form.reset();
          this.messages = [
            {
              severity: 'success',
              summary: 'Success',
              detail: `${this.form.value.title} added successfully`,
            },
          ];
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
}
