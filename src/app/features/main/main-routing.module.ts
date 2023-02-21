import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { GameComponent } from './game/game.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { MainComponent } from './main/main.component';

// const route: Route[] =

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: MainComponent,
        children: [{ path: 'game', component: GameComponent }],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class MainRoutingModule {}
