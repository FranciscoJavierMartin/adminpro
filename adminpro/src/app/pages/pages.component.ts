import { Component, OnInit } from '@angular/core';
import { LOCALSTORAGE_THEME_KEY } from '../constants/localStorage';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [],
})
export class PagesComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    const theme = localStorage.getItem(LOCALSTORAGE_THEME_KEY);
    const url = theme ? theme : `./assets/css/colors/default-dark.css`;
    const linkTheme = document.querySelector('#theme');
    linkTheme.setAttribute('href', url);
  }
}
