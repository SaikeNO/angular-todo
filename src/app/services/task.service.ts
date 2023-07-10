import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, map } from "rxjs";
import { AddTask } from "src/types/addTask";
import { Task } from "src/types/task";

@Injectable()
export class TasksService{
    initialTaskList: Task[] = JSON.parse(localStorage.getItem("tasks") || `[{"id":"532","title":"Learn Angular","description":"Lorem ipsum dolor sit amet cupidatat non proident","date":"2023-07-06T11:39:08.381Z","isDone":false},{"id":"dd4","title":"Do something","description":"Lorem ipsum dolor sit amet cupidatat non proident","date":"2023-07-06T11:39:08.381Z","isDone":false}]`);
    taskList$ = new BehaviorSubject<Task[]>(this.initialTaskList); 

    constructor(){
        const updatedTaskList = this.taskList$.getValue().map(task=>{
            task.date = new Date(task.date);
            return task;
        });
        this.taskList$.next(updatedTaskList);
    }

    getTaskList():Observable<Task[]>{
        return this.taskList$.asObservable();
    }

    getDoneTasks():Observable<Task[]>{
        return this.taskList$.asObservable().pipe(map((taskList: Task[]) => taskList.filter(task=>task.isDone)));
    }

    getUnDoneTasks():Observable<Task[]>{
        return this.taskList$.asObservable().pipe(map((taskList: Task[]) => taskList.filter(task=>!task.isDone)));
    }

    updateTaskList(updatedTaskList: Task[]):void{
        this.taskList$.next(updatedTaskList);
        localStorage.setItem("tasks", JSON.stringify(updatedTaskList));
    }

    addTask(addTask:AddTask):void{
        const newTask: Task = {
            id: Math.floor(Math.random() * 1000).toString(16),
            title: addTask.title,
            description: addTask.description,
            date: addTask.date,
            isDone: false,
        } 
        const updatedTaskList = [...this.taskList$.getValue(), newTask];
        this.updateTaskList(updatedTaskList);
    }

    removeTask(id:string):void{
       const updatedTaskList = this.taskList$.getValue().filter(task=>task.id !== id);
       this.updateTaskList(updatedTaskList);
    }

    doneTask(id:string):void{
        const updatedTaskList = this.taskList$.getValue().map(task =>{
            if(task.id === id) task.isDone = true;
            return task;
        })
        this.updateTaskList(updatedTaskList);
    }

    updateTask(newTask: Task){
        const updatedTaskList = this.taskList$.getValue().map(task =>{
            if(task.id === newTask.id){
                task = newTask;
            }
            return task;
        })
        this.updateTaskList(updatedTaskList);
    }
}