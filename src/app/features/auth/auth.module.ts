import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './auth/auth.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { AuthRoutingModule } from '../auth/auth-routing.module';

@NgModule({
  declarations: [RegistrationComponent, LoginComponent, AuthComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatInputModule,
    MatTabsModule,
    ReactiveFormsModule,
    AuthRoutingModule,
  ],
  exports: [LoginComponent, RegistrationComponent, AuthComponent],
})
export class AuthModule {}
