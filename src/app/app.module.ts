import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TasksComponent } from './tasks/tasks.component';
import { AddComponent } from './add/add.component';

import { taskReducer } from './store/tasks.reducer';

import { ButtonModule } from 'primeng/button';
import { TabMenuModule } from 'primeng/tabmenu';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { TaskComponent } from './task/task.component';

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    AddComponent,
    TaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    TabMenuModule,
    TableModule,
    InputTextModule,
    FormsModule,
    InputTextareaModule,
    CalendarModule,
    BrowserAnimationsModule,
    MessagesModule,
    MessageModule,
    StoreModule.forRoot({tasks: taskReducer})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
