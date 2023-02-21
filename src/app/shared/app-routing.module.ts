import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { AuthModule } from '../features/auth/auth.module';
import { AlreadyLoggedInGuard } from './guards/already-logged-in.guard';
import { UserGuard } from './guards/user.guard';

const route: Route[] = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () => AuthModule,
    canLoad: [AlreadyLoggedInGuard],
  },
  {
    path: 'game',
    loadChildren: () =>
      import('../features/main/main.module').then(
        (module) => module.MainModule
      ),
    canLoad: [UserGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(route)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
