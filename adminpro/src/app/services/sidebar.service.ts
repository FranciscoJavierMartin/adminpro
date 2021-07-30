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
    {
      title: 'Maintenance',
      icon: 'mdi mdi-folder-lock-open',
      submenu: [
        {
          title: 'Users',
          url: 'users',
        },
        {
          title: 'Hospitals',
          url: 'hospitals',
        },
        {
          title: 'Doctors',
          url: 'doctors',
        },
      ],
    },
  ];
  constructor() {}

  public get menu() {
    return this.menuItems;
  }
}
