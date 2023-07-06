import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TasksComponent } from './tasks/tasks.component';
import { AddComponent } from './add/add.component';

import { ButtonModule } from 'primeng/button';
import { TabMenuModule } from 'primeng/tabmenu';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { TaskComponent } from './task/task.component';
import { DoneComponent } from './done/done.component';
import { TasksService } from './services/task.service';
@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    AddComponent,
    TaskComponent,
    DoneComponent
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
    ToastModule, 
  ],
  providers: [TasksService],
  bootstrap: [AppComponent]
})
export class AppModule { }
