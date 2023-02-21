import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  // private routeList = ['admin', 'game', 'leaderboard'];
  onLogout() {
    this.userservice.removeCurrentUser();
    this.router.navigateByUrl('auth');
  }

  constructor(private userservice: UserService, private router: Router) {}
  ngOnInit(): void {}

  // changeTab(e: any) {
  //   const nextRoute = this.routeList[e.index];

  //   this.router.navigate(['/', nextRoute]);
  // }
}
