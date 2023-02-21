import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IQuestions } from '../models/questions-interface';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  url = 'http://localhost:3000/questions';

  getQuestions() {
    return this.httpClient.get<[IQuestions]>(this.url);
  }

  deleteQuestion(id: number) {
    return this.httpClient.delete(this.url + '/' + id);
  }

  addNewQuestion(question: IQuestions) {
    return this.httpClient.post<IQuestions>(this.url, question);
  }

  constructor(private httpClient: HttpClient) {}
}
