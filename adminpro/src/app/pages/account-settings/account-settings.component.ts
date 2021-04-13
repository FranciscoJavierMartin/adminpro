import { Component, OnInit } from '@angular/core';
import { LOCALSTORAGE_THEME_KEY } from 'src/app/constants/localStorage';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss'],
})
export class AccountSettingsComponent implements OnInit {
  readonly linkTheme = document.querySelector('#theme');
  private links: NodeListOf<Element>;

  constructor() {}

  ngOnInit(): void {
    this.links = document.querySelectorAll('.selector');
    this.checkCurrentTheme();
  }

  public changeTheme(theme: string): void {
    const url = `./assets/css/colors/${theme}.css`;
    this.linkTheme.setAttribute('href', url);
    localStorage.setItem(LOCALSTORAGE_THEME_KEY, url);
    this.checkCurrentTheme();
  }

  private checkCurrentTheme(): void {
    this.links.forEach((elem) => {
      elem.classList.remove('working');
      const btnTheme = elem.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
      const currentTheme = this.linkTheme.getAttribute('href');

      if (btnThemeUrl === currentTheme) {
        elem.classList.add('working');
      }
    });
  }
}
