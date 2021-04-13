import { Injectable } from '@angular/core';
import { LOCALSTORAGE_THEME_KEY } from '../constants/localStorage';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private linkTheme = document.querySelector('#theme');

  constructor() {
    const url =
      localStorage.getItem(LOCALSTORAGE_THEME_KEY) ||
      './assets/css/colors/default-dark.css';
    this.linkTheme.setAttribute('href', url);
  }

  public changeTheme(theme: string): void {
    const url = `./assets/css/colors/${theme}.css`;
    this.linkTheme.setAttribute('href', url);
    localStorage.setItem(LOCALSTORAGE_THEME_KEY, url);
    this.checkCurrentTheme();
  }

  public checkCurrentTheme(): void {
    const links: NodeListOf<Element> = document.querySelectorAll('.selector');

    links.forEach((elem) => {
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
