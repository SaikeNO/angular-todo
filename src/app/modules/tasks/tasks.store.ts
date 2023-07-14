import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable, switchMap } from 'rxjs';
import { Task } from 'src/types/task';
import { TasksService } from './tasks.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Dictionary } from 'src/types/dictionary';

export interface TasksState {
  taskList: Task[];
  unDoneDictionaries: Dictionary[];
  doneDiciotionaries: Dictionary[];
}

@Injectable()
export class TasksStore extends ComponentStore<TasksState> {
  constructor(private tasksService: TasksService) {
    super({ taskList: [], unDoneDictionaries: [], doneDiciotionaries: [] });
  }

  readonly taskList$: Observable<Task[]> = this.select(
    (state) => state.taskList
  );
  readonly unDoneDictionaries$: Observable<Dictionary[]> = this.select(
    (state) => state.unDoneDictionaries
  );
  readonly doneDiciotionaries$: Observable<Dictionary[]> = this.select(
    (state) => state.doneDiciotionaries
  );

  readonly vm$: Observable<TasksState> = this.select({
    taskList: this.taskList$,
    unDoneDictionaries: this.unDoneDictionaries$,
    doneDiciotionaries: this.doneDiciotionaries$,
  });

  readonly getTaskList = this.effect((params$: Observable<unknown>) => {
    return params$.pipe(
      switchMap(() =>
        this.tasksService.getTasks().pipe(
          tapResponse(
            (taskList: Task[]) => this.addTaskList(taskList),
            (error: HttpErrorResponse) => {} //! Handle error
          )
        )
      )
    );
  });

  readonly getUnDoneDictionaries = this.effect((params$: Observable<unknown>) => {
    return params$.pipe(
      switchMap(() =>
        this.tasksService.getUnDoneDictionaries().pipe(
          tapResponse(
            (unDoneDictionaries: Dictionary[]) => this.addUnDoneDictionaries(unDoneDictionaries),
            (error: HttpErrorResponse) => {} //! Handle error
          )
        )
      )
    );
  });

  readonly getDoneDictionaries = this.effect((params$: Observable<unknown>) => {
    return params$.pipe(
      switchMap(() =>
        this.tasksService.getDoneDictionaries().pipe(
          tapResponse(
            (doneDictionaries: Dictionary[]) => this.addDoneDictionaries(doneDictionaries),
            (error: HttpErrorResponse) => {} //! Handle error
          )
        )
      )
    );
  });


  readonly addTask = this.updater((state, task: Task) => {
    this.tasksService.addTask(task);
    return {
        ...state,
        taskList: [...state.taskList, task],
    };
  });
  

  readonly updateState = this.updater((state, taskList: Task[]) => ({
    ...state,
    taskList,
  }));

  readonly addTaskList = this.updater((state, taskList: Task[]) => ({
    ...state,
    taskList,
  }));

  readonly addUnDoneDictionaries = this.updater((state, unDoneDictionaries: Dictionary[]) => ({
    ...state,
    unDoneDictionaries,
  }));

  readonly addDoneDictionaries = this.updater((state, doneDictionaries: Dictionary[]) => ({
    ...state,
    doneDictionaries,
  }));

//   readonly removeTask = this.updater((state, taskId: string) => {
//     this.tasksService.removeTask(taskId);
//     return {
//       tasks: state.tasks.filter((task) => task._id !== taskId),
//     };
//   });

  //   selectTask(taskId: string) {
  //     return this.select((state) => state.tasks.find(task => task._id === taskId));
  //   }
}
