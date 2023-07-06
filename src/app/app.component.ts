import { Component, OnInit } from '@angular/core';
import { MenuItem, PrimeIcons, PrimeNGConfig } from 'primeng/api';
import { taskInterface } from 'src/types/task';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  menuItems: MenuItem[] | undefined;
  tasks: taskInterface[] = [];

  constructor(private primengConfig: PrimeNGConfig) {}
  ngOnInit() {
      this.primengConfig.ripple = true;

      this.menuItems = [
        { label: 'Home', icon: PrimeIcons.HOME, routerLink: '/tasks', },
        { label: 'Add new', icon: PrimeIcons.PLUS, routerLink: '/add' },
        { label: 'Edit', icon: PrimeIcons.FILE_EDIT, routerLink: '/edit' },
        { label: 'Done', icon: PrimeIcons.CHECK, routerLink: '/done' },
    ];
  }
}