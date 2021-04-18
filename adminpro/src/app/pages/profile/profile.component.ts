import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public profileForm: FormGroup;
  public user: User;

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.user = this.userService.getUser;
    this.profileForm = this.fb.group({
      name: [this.user.name, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
    });
  }

  updateProfile(): void {
    this.userService.updateProfile(this.profileForm.value).subscribe((resp) => {
      console.log(resp);
    });
  }
}
