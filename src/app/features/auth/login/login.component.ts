import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { UserHttpService } from 'src/app/services/user-http.service';
import { UserService } from 'src/app/services/user.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }

  matcher = new MyErrorStateMatcher();

  onLogin() {
    const user = this.form.value;
    this.usersHttp.login(user).subscribe((data) => {
      if (data) {
        this.userservice.setCurrentUser(data);
        this.router.navigateByUrl('game');
      } else {
        alert('invalid login');
      }
    });
  }
  constructor(
    private usersHttp: UserHttpService,
    private router: Router,
    private userservice: UserService
  ) {}

  ngOnInit(): void {}
}
