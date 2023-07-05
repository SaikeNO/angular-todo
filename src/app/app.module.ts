import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TasksComponent } from './tasks/tasks.component';
import { AddComponent } from './add/add.component';

import { ButtonModule } from 'primeng/button';
import { TabMenuModule } from 'primeng/tabmenu';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store'
@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    AddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    TabMenuModule,
    TableModule,
    InputTextModule,
    FormsModule,
    StoreModule.forRoot(reducers)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
