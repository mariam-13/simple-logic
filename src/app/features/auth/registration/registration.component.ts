import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { IUser } from 'src/app/models/user-interface';
import { UserHttpService } from 'src/app/services/user-http.service';
import { catchError, filter, switchMap, tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

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
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    name: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
  });

  // emailFormControl = new FormControl('', [
  //   Validators.required,
  //   Validators.email,
  // ]);
  // passwordFormControl = new FormControl('', [
  //   Validators.required,
  //   Validators.minLength(6),
  // ]);
  // nameFormControl = new FormControl('', [Validators.required]);
  // lastnameFormControl = new FormControl('', [Validators.required]);

  get name() {
    return this.form.get('name');
  }
  get lastname() {
    return this.form.get('lastname');
  }
  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }

  matcher = new MyErrorStateMatcher();

  constructor(
    private usersHttp: UserHttpService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  onRegister() {
    const user = this.form.value;
    this.usersHttp
      .register(user)
      .pipe(
        tap((data) => {
          this.router.navigate(['game', { relativeTo: this.route }]);
          console.log(data);
        })
        // catchError((err) => {
        //   this.errorHandler.isError(err);
        //   return of(null);
        // })
      )
      .subscribe();
  }

  ngOnInit(): void {}
}
