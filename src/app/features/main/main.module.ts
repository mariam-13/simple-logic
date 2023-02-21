import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { MainRoutingModule } from './main-routing.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { LeaderboardModule } from './leaderboard/leaderboard.module';
import { GameModule } from './game/game.module';
import { AdminModule } from './admin/admin.module';

@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    MatTabsModule,
    MatButtonModule,
    MainRoutingModule,
    GameModule,
    LeaderboardModule,
    AdminModule,
  ],
})
export class MainModule {}
