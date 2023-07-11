import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TasksComponent } from './tasks/tasks.component';
import { AddComponent } from './add/add.component';
import { TaskComponent } from './task/task.component';
import { DoneComponent } from './done/done.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { TasksService } from './services/task.service';
import { PrimeNgModule } from './prime-ng.module';

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    AddComponent,
    TaskComponent,
    DoneComponent,
    PageNotFoundComponent,
  ],
  imports: [
    PrimeNgModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [TasksService],
  bootstrap: [AppComponent]
})
export class AppModule { }
