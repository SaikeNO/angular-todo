import { EventEmitter, Injectable } from "@angular/core";
import { taskInterface } from "src/types/task";

@Injectable()
export class TasksService{
    taskList: taskInterface[] = [
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

    doneTaskList: taskInterface[] = [];

    addTask(task: taskInterface):void{
        this.taskList.push(task);
    }

    removeTask(id:string):void{
        this.doneTaskList = this.doneTaskList.filter(task=>task.id !== id);
    }

    doneTask(id:string):void{
        const foundTask = this.taskList.find(task=>task.id === id);
        if(foundTask){
            this.doneTaskList.push(foundTask);
            this.taskList = this.taskList.filter(task => task.id !== id);
        }
    }
}