import { Component } from '@angular/core';

import { Task } from 'src/types/task';
import { TasksService } from '../services/task.service';

@Component({
  selector: 'app-done',
  templateUrl: './done.component.html',
  styleUrls: ['./done.component.scss'],
})

export class DoneComponent  {
  doneTaskList!:Task[];

  constructor(private tasksService: TasksService) {
    this.tasksService.getDoneTasks().subscribe(taskList=>{
      this.doneTaskList = taskList;
    });
  }

  onDeleteClick(id: string): void {
    this.tasksService.removeTask(id).subscribe(() => {
      this.doneTaskList = this.doneTaskList.filter(task=>task._id !==id);
    })
  }
}
