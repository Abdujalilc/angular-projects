import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Quiz } from '../../models/quiz';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
})
export class QuizComponent implements OnInit {

  quiz = new Quiz();
  subscription = new Subscription();
  constructor(private apiSvc: ApiService, private router: Router) { }


  resetQuiz() {
    this.quiz = new Quiz();
  }

  ngOnInit() {
    this.subscription = this.apiSvc.getSelectedQuiz().subscribe(q => {
      this.quiz = q;
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  navigateToQuestions() {
    this.router.navigate(['/question/' + this.quiz.id]);
  }

  post() {
    if (this.quiz.id)
      this.apiSvc.putQuiz(this.quiz);
    else
    {
      this.quiz.id=0
      this.quiz.ownerid="0"
      this.apiSvc.postQuiz(this.quiz);
    }    
    this.resetQuiz();
  }

}
