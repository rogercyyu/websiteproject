import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  SigninForm=new FormGroup({});
  forbiddenEmails: any;
  errorMessage: string | any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.buildSigninForm();
  }

  ngOnInit() {
  }

  private buildSigninForm() {
    this.SigninForm = this.fb.group({
      email: [null, [Validators.required, Validators.email], this.forbiddenEmails],
      password: [null, [Validators.required, Validators.minLength(4)]],
    });
  }

  onSubmit() {
    this.SigninForm.reset();
  }

  signinUser() {
    console.log(this.SigninForm.value);
    this.authService.loginUser(this.SigninForm.value).subscribe(
      data => {
        this.SigninForm.reset();
        setTimeout(() => {
          this.router.navigate(['home']);
        }, 3000);
      },
      err => {
        if (err.error.msg) {
          this.errorMessage = err.error.msg[0].message;
        }
        if (err.error.message) {
          this.errorMessage = err.error.message;
        }
      }
    );
  }

}