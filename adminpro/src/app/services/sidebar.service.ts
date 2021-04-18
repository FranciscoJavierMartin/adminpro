import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private menuItems = [
    {
      title: 'Dashboard',
      icon: 'mdi mdi-gauge',
      submenu: [
        {
          title: 'Main',
          url: '/dashboard',
        },
        {
          title: 'ProgressBar',
          url: 'progress',
        },
      ],
    },
  ];
  constructor() {}

  public get menu(){
    return this.menuItems;
  }
}
