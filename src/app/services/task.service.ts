import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ITask } from "src/types/task";

@Injectable()
export class TasksService{
    taskList: ITask[] = JSON.parse(localStorage.getItem("tasks") || `[{"id":"532","title":"Learn Angular","description":"Lorem ipsum dolor sit amet cupidatat non proident","date":"2023-07-06T11:39:08.381Z","isDone":false},{"id":"dd4","title":"Do something","description":"Lorem ipsum dolor sit amet cupidatat non proident","date":"2023-07-06T11:39:08.381Z","isDone":false}]`);
    taskEmitter$ = new BehaviorSubject<ITask[]>(this.taskList); 

    constructor(){
        this.taskList.forEach(task=>task.date = new Date(task.date));
    }

    raiseTaskEmitter(){
        localStorage.setItem("tasks", JSON.stringify(this.taskList));
        this.taskEmitter$.next(this.taskList);
    }

    addTask(title: string, description: string, date: Date):void{
        const newTask: ITask = {
            id: Math.floor(Math.random() * 1000).toString(16),
            title,
            description,
            date,
            isDone: false,
        } 
        this.taskList.push(newTask);
        this.raiseTaskEmitter();
    }

    removeTask(id:string):void{
        this.taskList = this.taskList.filter(task=>task.id !== id);
        this.raiseTaskEmitter();
    }

    doneTask(id:string):void{
        this.taskList.forEach(task =>{
            if(task.id === id) task.isDone = true;
        })
        this.raiseTaskEmitter();
    }
}