import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.component.html',
})
export class QuizzesComponent implements OnInit {
  quizzes;

  constructor(private apiSvc: ApiService) { }

  ngOnInit() {
    this.apiSvc.getQuizzes().subscribe(result => {
      this.quizzes = result;
    });
    this.apiSvc.getNewQuiz().subscribe(newQuiz => {
      this.quizzes.push(newQuiz);
    });
  }

}
