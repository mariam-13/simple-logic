import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { of } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { IQuestions } from 'src/app/models/questions-interface';
import { QuestionsService } from 'src/app/services/questions.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  @ViewChild('fileUpload') public fileUpload: ElementRef<HTMLInputElement>;
  @ViewChild('secFileUpload')
  public secFileUpload: ElementRef<HTMLInputElement>;

  panelOpenState = false;
  showForm = false;
  questions: IQuestions[];
  constructor(private questionservices: QuestionsService) {}

  form = new FormGroup({
    answer: new FormControl(''),
    firstPicture: new FormControl(''),
    secondPicture: new FormControl(''),
  });

  getAllQuestions() {
    this.questionservices.getQuestions().subscribe((data) => {
      this.questions = data;
    });
  }
  ngOnInit(): void {
    this.getAllQuestions();
  }

  onDelete(id: number) {
    const index = this.questions.findIndex((u) => u.id === id);
    this.questionservices
      .deleteQuestion(id as number)
      .pipe(
        tap((data) => {
          this.questions.splice(index, 1);
        }),
        retry(2),
        catchError((err) => {
          console.log(err);
          // this.errorHandler.isError(err);
          return of(null);
        })
      )
      .subscribe();

    console.log(id);
  }

  onAdd() {
    this.showForm = !this.showForm;
  }

  getBase64() {
    const firstFile = this.fileUpload.nativeElement?.files![0];
    console.log(this.fileUpload.nativeElement);

    var reader = new FileReader();
    reader.readAsDataURL(firstFile);
    reader.onload = () => {
      this.firstImage.setValue(reader.result, { emitEvent: false });
      // console.log(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  secGetBase64() {
    const secondFile = this.secFileUpload.nativeElement?.files![0];
    console.log(this.secFileUpload.nativeElement);

    var readerr = new FileReader();
    readerr.readAsDataURL(secondFile);
    readerr.onload = () => {
      this.secontImage.setValue(readerr.result, { emitEvent: false });
      // console.log(readerr.result);
    };
    readerr.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  addNewQuestion() {
    const data = this.form.value;
    console.log(data);

    this.questionservices
      .addNewQuestion(data)
      .pipe(
        tap((data) => {
          this.showForm = false;
        }),
        catchError((err) => {
          return of(null);
        })
      )
      .subscribe();
    this.getAllQuestions();
  }

  public get firstImage() {
    return this.form.get('firstPicture') as FormControl;
  }
  public get secontImage() {
    return this.form.get('secondPicture') as FormControl;
  }
}
