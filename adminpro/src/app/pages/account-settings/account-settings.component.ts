import { Component, OnInit } from '@angular/core';
import { LOCALSTORAGE_THEME_KEY } from 'src/app/constants/localStorage';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss'],
})
export class AccountSettingsComponent implements OnInit {
  constructor(private settingsService: SettingsService) {}

  ngOnInit(): void {
    this.settingsService.checkCurrentTheme();
  }

  public changeTheme(theme: string): void {
    this.settingsService.changeTheme(theme);
  }
}
