import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IQuestions } from 'src/app/models/questions-interface';
import { QuestionsService } from 'src/app/services/questions.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit, OnDestroy {
  questions: [IQuestions];
  answer: string;
  firstPicture: string;
  secondPicture: string;
  hideAnswer: string = '';
  showWin = false;
  showGame = false;
  len: number;
  time = 19800;

  constructor(private questionservices: QuestionsService) {}
  subs: Subscription[] = [];
  n = 0;
  score = 0;
  randomNum: number;

  answerInput = new FormControl('');

  getAllQuestions() {
    this.questionservices.getQuestions().subscribe((data) => {
      console.log(data);
      this.questions = data;
      this.answer = this.questions[0].answer;
      this.firstPicture = this.questions[0].firstPicture;
      this.secondPicture = this.questions[0].secondPicture;
      this.len = this.questions.length;
      for (let i = 0; i < this.answer.length; i++) {
        this.hideAnswer += '*';
      }
    });
  }

  getHideAnswer() {}
  valueChanges() {
    const sub = this.answerInput.valueChanges.subscribe((answer) => {
      this.hideAnswer = '';
      for (let i = 0; i < this.answer.length; i++) {
        this.hideAnswer += '*';
      }
      if (answer === this.answer) {
        if (this.n < this.questions.length - 1) {
          this.n++;
          this.randomNum = Math.floor(
            Math.random() * this.questions.length + 1
          );
        } else {
          this.showWin = true;
        }
        this.answer = this.questions[this.n].answer;
        this.firstPicture = this.questions[this.n].firstPicture;
        this.secondPicture = this.questions[this.n].secondPicture;
        this.score++;
        this.answerInput.reset();
      }
    });

    this.subs.push(sub);
  }

  countTime() {
    this.showGame = true;

    setInterval(() => {
      if (this.time > 0) {
        this.time -= 1;
      } else {
        this.showWin = true;
      }
    }, 1000);
  }

  ngOnInit(): void {
    this.getAllQuestions();
    this.valueChanges();
    this.getHideAnswer();
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
