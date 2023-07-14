import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";

import { TasksRoutingModule } from './tasks-routing.module';
import { PrimeNgModule } from './prime-ng.module';

import { TasksComponent } from './components/tasks/tasks.component';
import { UndoneComponent } from './components/undone/undone.component';
import { AddComponent } from './components/add/add.component';
import { TaskComponent } from './components/task/task.component';
import { DoneComponent } from './components/done/done.component';

import { TasksService } from './tasks.service';
import { TasksStore } from './tasks.store';

@NgModule({
  declarations: [
    TasksComponent,
    AddComponent,
    TaskComponent,
    UndoneComponent,
    DoneComponent,
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    TasksRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [TasksService, TasksStore],
})
export class TaskModule { }
