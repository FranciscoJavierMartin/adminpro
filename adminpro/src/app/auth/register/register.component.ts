import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  public formSubmitted: boolean = false;
  public registerForm = this.fb.group(
    {
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      terms: [false, Validators.required],
    },
    {
      validators: this.matchFields('password', 'confirmPassword'),
    }
  );

  constructor(private fb: FormBuilder, private userService: UserService) {}

  public register() {
    this.formSubmitted = true;
    if (this.registerForm.valid) {
      const { confirmPassword, terms, ...others } = this.registerForm.value;
      this.userService.register(others).subscribe(
        (res) => console.log(res),
        (err) => {
          Swal.fire('Error', err.error.message, 'error');
        }
      );
    }
  }

  public invalidField(field: string): boolean {
    return this.registerForm.get(field).invalid && this.formSubmitted;
  }

  public isTermsAccepted(): boolean {
    return this.registerForm.get('terms').value && this.formSubmitted;
  }

  public matchFields(fieldOne: string, fieldTwo: string) {
    return (formGroup: FormGroup) => {
      const field1Control = formGroup.get(fieldOne);
      const field2Control = formGroup.get(fieldTwo);

      if (field2Control.value === field1Control.value) {
        field2Control.setErrors(null);
      } else {
        field2Control.setErrors({ notEqual: true });
      }
    };
  }
}
