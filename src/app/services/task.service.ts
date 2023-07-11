import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { Task } from 'src/types/task';
import { environment } from 'src/environments/environment.development';

@Injectable()
export class TasksService {
  constructor(private httpClient: HttpClient) {}
  taskList$ = new BehaviorSubject<Task[]>([]);

  getTasks(): Observable<Task[]> {
    this.httpClient
      .get<Task[]>(environment.apiUrl)
      .pipe(
        map((taskList) =>
          taskList.map((task) => {
            task.date = new Date(task.date);
            return task;
          })
        ),
        tap((taskList) => this.taskList$.next(taskList))
      )
      .subscribe();

    return this.taskList$.asObservable();
  }

  getDoneTasks(): Observable<Task[]> {
    return this.getTasks().pipe(
      map((taskList) => taskList.filter((task) => task.isDone))
    );
  }

  getUnDoneTasks(): Observable<Task[]> {
    return this.getTasks().pipe(
      map((taskList) => taskList.filter((task) => !task.isDone))
    );
  }

  addTask(newTask: Task) {
    this.httpClient.post(environment.apiUrl, newTask).subscribe();
  }

  updateTask({ _id, title, description, date, isDone }: Task): void {
    this.httpClient.put(`${environment.apiUrl}/${_id}`, { title, description, date, isDone })
      .subscribe();
  }

  removeTask(id: string): void {
    this.httpClient.delete(`${environment.apiUrl}/${id}`).subscribe(() => {
        const updateTaskList = this.taskList$.getValue().filter(task => task._id !== id);
        this.taskList$.next(updateTaskList);
    })
  }

  doneTask(id: string): void {
    this.httpClient.put(`${environment.apiUrl}/${id}`, { isDone: true }).subscribe(() =>{ //! Obsługa błędu
        const updateTaskList = this.taskList$.getValue().map(task => {
            if(task._id === id){
                task.isDone = true;
            }  
            return task;
        });

        this.taskList$.next(updateTaskList);
        //!Zrobić toast z wykonanym zadaniem
    });
  }
}
