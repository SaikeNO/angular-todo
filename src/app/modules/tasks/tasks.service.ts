import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { Task } from 'src/types/task';
import { environment } from 'src/environments/environment.development';
import { Dictionary } from 'src/types/dictionary';

@Injectable()
export class TasksService {
  taskList$ = new BehaviorSubject<Task[]>([]);

  constructor(private httpClient: HttpClient) {}

  private getTasks(): Observable<Task[]> {
    this.httpClient
      .get<Task[]>(environment.apiUrl)
      .pipe(
        catchError((reponse:HttpErrorResponse) => {
          this.taskList$.error(reponse);
          return throwError(() => new Error(reponse.message));
        }),
        map((taskList) =>
          taskList.map((task) => ({ ...task, date: new Date(task.date) }))
        )
      )
      .subscribe((taskList) => this.taskList$.next(taskList));

    return this.taskList$.asObservable();
  }

  getTaskById(id: string): Observable<Task> {
    return this.httpClient
      .get<Task>(`${environment.apiUrl}/${id}`)
      .pipe(map((task) => ({ ...task, date: new Date(task.date) })));
  }

  getDoneDictionaries(): Observable<Dictionary[]> {
    return this.getTasks().pipe(
      map((taskList) => taskList.filter((task) => task.isDone)),
      map((taskList) =>
        taskList.map(
          (task) =>
            ({ id: task._id, label: task.title, date: task.date } as Dictionary)
        )
      )
    );
  }

  getUnDoneDictionaries(): Observable<Dictionary[]> {
    return this.getTasks().pipe(
      map((taskList) => taskList.filter((task) => !task.isDone)),
      map((taskList) =>
        taskList.map(
          (task) =>
            ({ id: task._id, label: task.title, date: task.date } as Dictionary)
        )
      )
    );
  }

  addTask(newTask: Task) {
    return this.httpClient.post(environment.apiUrl, newTask);
  }

  updateTask({ _id, title, description, date, isDone }: Task) {
    return this.httpClient.put(`${environment.apiUrl}/${_id}`, {
      title,
      description,
      date,
      isDone,
    });
  }

  removeTask(id: string): void {
    this.httpClient.delete(`${environment.apiUrl}/${id}`).subscribe(() => {
      const updateTaskList = this.taskList$
        .getValue()
        .filter((task) => task._id !== id);
      this.taskList$.next(updateTaskList);
    });
  }

  doneTask(id: string): void {
    const foundTask = this.taskList$.getValue().find((task) => task._id === id);

    if (!foundTask) return;

    const { title, description, date } = foundTask;

    this.httpClient
      .put(`${environment.apiUrl}/${id}`, {
        title,
        description,
        date,
        isDone: true,
      })
      .subscribe(() => {
        const updateTaskList = this.taskList$.getValue().map((task) => {
          if (task._id === id) {
            task.isDone = true;
          }
          return task;
        });

        this.taskList$.next(updateTaskList);
      });
  }
}
