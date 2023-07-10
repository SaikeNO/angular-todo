import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, map, take } from "rxjs";
import { Task } from "src/types/task";
import { environment } from "src/environments/environment.development";

@Injectable()
export class TasksService{
    constructor(private httpClient: HttpClient){}

    private getTasks():Observable<Task[]>{
        return this.httpClient.get<Task[]>(environment.apiUrl).pipe(map(taskList=>taskList.map(task=>{
            task.date = new Date(task.date);
            return task;
        })))
    }

    getDoneTasks():Observable<Task[]>{
        return this.getTasks().pipe(map(taskList=>taskList.filter(task=>task.isDone)));
    }

    getUnDoneTasks():Observable<Task[]>{
        return this.getTasks().pipe(map(taskList=>taskList.filter(task=>!task.isDone)));
    }

    addTask(newTask:Task){
        this.httpClient.post(environment.apiUrl, newTask).subscribe();
    }

    removeTask(id:string){
        return this.httpClient.delete(`${environment.apiUrl}/${id}`);
    }

    updateTask({ _id, title, description, date, isDone }: Task){
        this.httpClient.put(`${environment.apiUrl}/${_id}`, {title, description, date, isDone}).subscribe()
    }

    doneTask(id:string){
        this.httpClient.get<Task>(`${environment.apiUrl}/${id}`).pipe(take(1)).subscribe(task => {
            task.isDone = true;
            this.updateTask(task)
        })
    }
}