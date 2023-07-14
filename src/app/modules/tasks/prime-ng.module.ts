import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';


import { ButtonModule } from 'primeng/button';
import { TabMenuModule } from 'primeng/tabmenu';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { SkeletonModule } from 'primeng/skeleton';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    TabMenuModule,
    TableModule,
    InputTextModule,
    InputTextareaModule,
    CalendarModule,
    MessagesModule,
    MessageModule,
    ToastModule,
  ],
  exports: [
    ButtonModule,
    TabMenuModule,
    TableModule,
    InputTextModule,
    InputTextareaModule,
    CalendarModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    SkeletonModule,
  ]
})
export class PrimeNgModule { }
