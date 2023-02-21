import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { GameComponent } from './game.component';

const route: Route[] = [
  {
    path: '',
    component: GameComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule],
})
export class GameRoutingModule {}
