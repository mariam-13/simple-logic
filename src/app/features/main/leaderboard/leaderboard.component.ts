import { Component, OnInit, ViewChild } from '@angular/core';

export interface PeriodicElement {
  name: string;
  position: number;
  score: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Leo', score: 4 },
  { position: 2, name: 'Scott', score: 4 },
  { position: 3, name: 'Sara', score: 3 },
  { position: 4, name: 'Emma', score: 7 },
  { position: 5, name: 'John', score: 9 },
];

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css'],
})
export class LeaderboardComponent implements OnInit {
  ngOnInit(): void {}

  displayedColumns: string[] = ['position', 'name', 'score'];
  dataSource = ELEMENT_DATA;

  constructor() {}
}
