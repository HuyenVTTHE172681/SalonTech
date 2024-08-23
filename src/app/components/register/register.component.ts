import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenService } from '../../services/authen.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm: any; // Declare registerForm here

  constructor(
    private formBuilder: FormBuilder,
    private authenticationSrv: AuthenService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialize the form inside ngOnInit
    this.registerForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        userName: ['', [Validators.required]],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required, Validators.maxLength(8)],
      },
      {
        validators: this.passwordMatcher,
      }
    );
  }

  passwordMatcher(formGroup: any): { [key: string]: boolean } | null {
    const password = formGroup.get('password');
    const confirmPassword = formGroup.get('confirmPassword');
    if (
      password &&
      confirmPassword &&
      password.value !== confirmPassword.value
    ) {
      return { passwordMismatch: true };
    }
    return null;
  }

  // onSubmit(): void {
  //   this.submitted = true;
  //   if (this.registerForm.invalid) {
  //     return;
  //   }

  //   this.loading = true;
  //   this.register();
  // }
  register(): void {
    const postData = { ...this.registerForm.value };
    delete postData.confirmPassword;

    if (this.registerForm.valid) {
      this.authenticationSrv.register(this.registerForm.value).subscribe(
        (res) => {
          console.log('Registration successful', res);
          this.router.navigate(['/login']);
        },
        (err) => {
          console.error('Registration failed', err);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }

  // Getters for form controls
  get email() {
    return this.registerForm.get('email');
  }
  get userName() {
    return this.registerForm.get('userName');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }
}
