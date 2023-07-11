import { Component, OnInit } from '@angular/core';
import { MenuItem, PrimeIcons, PrimeNGConfig } from 'primeng/api';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  menuItems: MenuItem[] | undefined;

  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit() {
      this.primengConfig.ripple = true;

      this.menuItems = [
        { label: 'Home', icon: PrimeIcons.HOME, routerLink: '/tasks' },
        { label: 'Add new', icon: PrimeIcons.PLUS, routerLink: '/tasks/add' },
        { label: 'Done', icon: PrimeIcons.CHECK, routerLink: '/tasks/done' },
    ];
  }
}