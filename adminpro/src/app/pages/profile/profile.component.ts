import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { User } from 'src/app/models/user.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public profileForm: FormGroup;
  public user: User;
  public imageToUpload: File;
  public preliminaryImage: any = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private fileUploadService: FileUploadService
  ) {}

  ngOnInit(): void {
    this.user = this.userService.getUser;
    this.profileForm = this.fb.group({
      name: [this.user.name, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
    });
  }

  public updateProfile(): void {
    this.userService.updateProfile(this.profileForm.value).subscribe(
      (resp) => {
        Swal.fire('Saved', 'Saved changes', 'success');
      },
      (err) => {
        console.log(err);
        Swal.fire('Error', err.error.message, 'error');
      }
    );
  }

  public changeImage(file: File): void {
    this.imageToUpload = file;

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        this.preliminaryImage = reader.result;
      };
    } else {
      this.preliminaryImage = null;
    }
  }

  public uploadImage() {
    this.fileUploadService
      .updatePhoto(this.imageToUpload, 'users', this.user.id)
      .then((res) => {
        this.user.img = res.message;
        Swal.fire('Saved', 'Saved image', 'success');
      });
  }
}
