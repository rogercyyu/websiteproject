﻿import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthService } from '../../service/auth.service';
//import { MustMatch } from '@app/_helpers';

@Component({
  templateUrl: 'update.component.html',
  styleUrls: ['../signin/signin.component.css'],
})
export class UpdateComponent implements OnInit {
  account = JSON.parse(localStorage.getItem('user')).user; //this.accountService.userValue;
  form: FormGroup;
  loading = false;
  submitted = false;
  deleting = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) //private alertService: AlertService
  {}

  ngOnInit() {
    this.form = this.formBuilder.group(
      {
        first_name: [this.account.first_name, Validators.required],
        last_name: [this.account.last_name, Validators.required],
        email: [this.account.email, [Validators.required, Validators.email]],
        password: ['', [Validators.minLength(6)]],
        confirm_password: [''],
      },
      {
        //validator: MustMatch('password', 'confirmPassword')
      }
    );
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    //this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.authService
      .updateUser(this.account.customer_id, this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          //this.alertService.success('Update successful', { keepAfterRouteChange: true });
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: (error) => {
          //this.alertService.error(error);
          this.loading = false;
        },
      });
  }

  // onDelete() {
  //     if (confirm('Are you sure?')) {
  //         this.deleting = true;
  //         this.authService.delete(this.account.id)
  //             .pipe(first())
  //             .subscribe(() => {
  //                 //this.alertService.success('Account deleted successfully', { keepAfterRouteChange: true });
  //             });
  //     }
  // }
}
