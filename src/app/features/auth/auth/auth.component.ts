import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  Mode: String = 'login';
  chooseModeLog() {
    this.Mode = 'login';
  }
  chooseModeReg() {
    this.Mode = 'register';
  }
  constructor() {}

  ngOnInit(): void {}
}
