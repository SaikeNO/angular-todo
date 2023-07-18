import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Task } from 'src/types/task';
import { environment } from 'src/environments/environment.development';
import { Dictionary } from 'src/types/dictionary';

@Injectable()
export class TasksService {
  constructor(private httpClient: HttpClient) {}

  private convertToDate(task: Task): Task {
    return { ...task, date: new Date(task.date) };
  }

  private convertToDictionary({_id:id, title:label, date}: Task): Dictionary {
    return { id, label, date } as Dictionary;
  }

  getTasks(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(environment.apiUrl).pipe(
      catchError((reponse: HttpErrorResponse) =>
        throwError(() => new Error(reponse.statusText))
      ),
      map((taskList) => taskList.map(this.convertToDate))
    );
  }

  getTaskById(id: string): Observable<Task> {
    return this.httpClient.get<Task>(`${environment.apiUrl}/${id}`).pipe(
      catchError((reponse: HttpErrorResponse) =>
        throwError(() => new Error(reponse.message))
      ),
      map(this.convertToDate)
    );
  }

  getDoneDictionaries(): Observable<Dictionary[]> {
    return this.getTasks().pipe(
      map((taskList) => taskList.filter((task) => task.isDone)),
      map((taskList) => taskList.map(this.convertToDictionary))
    );
  }

  getUnDoneDictionaries(): Observable<Dictionary[]> {
    return this.getTasks().pipe(
      map((taskList) => taskList.filter((task) => !task.isDone)),
      map((taskList) => taskList.map(this.convertToDictionary))
    );
  }

  addTask(newTask: Task) {
    return this.httpClient
      .post(environment.apiUrl, newTask)
      .pipe(
        catchError((reponse: HttpErrorResponse) =>
          throwError(() => new Error(reponse.message))
        )
      );
  }

  updateTask({ _id, title, description, date, isDone }: Task) {
    return this.httpClient
      .put(`${environment.apiUrl}/${_id}`, {
        title,
        description,
        date,
        isDone,
      })
      .pipe(
        catchError((reponse: HttpErrorResponse) =>
          throwError(() => new Error(reponse.message))
        )
      );
  }

  removeTask(id: string) {
    return this.httpClient
      .delete(`${environment.apiUrl}/${id}`)
      .pipe(
        catchError((reponse: HttpErrorResponse) =>
          throwError(() => new Error(reponse.message))
        )
      );
  }

  doneTask({ _id, title, description, date }: Task) {
    return this.httpClient
      .put(`${environment.apiUrl}/${_id}`, {
        title,
        description,
        date,
        isDone: true,
      })
      .pipe(
        catchError((reponse: HttpErrorResponse) =>
          throwError(() => new Error(reponse.message))
        )
      );
  }
}
