import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ITask } from "src/types/task";

@Injectable()
export class TasksService{
    taskList: ITask[] = [
        {
            id: '532',
            title: 'Learn Angular',
            description: 'Lorem ipsum dolor sit amet cupidatat non proident',
            date: new Date(),
            isDone: false,
        },
        {
            id: 'dd4',
            title: 'Do something',
            description: 'Lorem ipsum dolor sit amet cupidatat non proident',
            date: new Date(),
            isDone: false,
        },
    ];

    taskEmitter = new BehaviorSubject<ITask[]>(this.taskList);

    addTask(task: ITask):void{
        this.taskList.push(task);
        this.taskEmitter.next(this.taskList);
    }

    removeTask(id:string):void{
        this.taskList = this.taskList.filter(task=>task.id !== id);
        this.taskEmitter.next(this.taskList);
    }

    doneTask(id:string):void{
        this.taskList.forEach(task =>{
            if(task.id === id) task.isDone = true;
        })
        this.taskEmitter.next(this.taskList);
    }
}