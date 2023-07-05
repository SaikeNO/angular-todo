import { Injectable } from '@angular/core';
import { taskInterface } from 'src/types/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

    public getTasks() {
        return JSON.parse(localStorage.getItem("tasks") || "");
    }

    public addTask(title: string, description: string, date: Date) {
        const tasks: taskInterface[] = this.getTasks();
        
        const task: taskInterface = {
            id: Math.random().toString(16),
            title,
            description,
            date
        };

        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }



    public removeTask(id: string) {
        let tasks: taskInterface[] = this.getTasks();
        
        tasks = tasks.filter(task => task.id !== id);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}