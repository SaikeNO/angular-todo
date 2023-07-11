import { Component, OnInit } from '@angular/core';
import { MenuItem, PrimeIcons } from 'primeng/api';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})

export class TasksComponent implements OnInit {
  menuItems: MenuItem[] | undefined;

  ngOnInit() {
      this.menuItems = [
        { label: 'Home', icon: PrimeIcons.HOME, routerLink: './undone',  routerLinkActiveOptions:{ exact: true }  },
        { label: 'Add new', icon: PrimeIcons.PLUS, routerLink: './add' },
        { label: 'Done', icon: PrimeIcons.CHECK, routerLink: './done' },
    ];
  }
}
