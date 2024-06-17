import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Question } from '../models/question';
import { Quiz } from '../models/quiz';

@Injectable()
export class ApiService {

    private selectedQuestion = new Subject<Question>();
    private selectedQuiz = new Subject<Quiz>();
    private newQuiz = new Subject<Quiz>();

    constructor(private http: HttpClient) { }

    selectQuestion(question: Question) {
        this.selectedQuestion.next(question);
    }

    selectQuiz(quiz: Quiz) {
        this.selectedQuiz.next(quiz);
    }

    getSelectedQuestion() {
        return this.selectedQuestion.asObservable();
    }

    getSelectedQuiz() {
        return this.selectedQuiz.asObservable();
    }

    getNewQuiz() {
        return this.newQuiz.asObservable();
    }

    addNewQuiz(quiz: Quiz) {
        return this.newQuiz.next(quiz);
    }

    postQuestion(question: Question) {
        this.http.post('/api/question', question)
            .subscribe(response => {
                console.log(response);
            });
    }

    putQuestion(question: Question) {
        this.http.put('/api/question/' + question.id, question)
            .subscribe(response => {
                console.log(response);
            });
    }

    postQuiz(quiz: Quiz) {
        this.http.post('/api/quizzes', quiz)
            .subscribe(response => {
                this.addNewQuiz(response as Quiz);
                console.log(response);
            });
    }

    putQuiz(quiz: Quiz) {
        this.http.put('/api/quizzes/' + quiz.id, quiz)
            .subscribe(response => {
                console.log(response);
            });
    }

    getQuestions(quizId) {
        return this.http.get(`/api/question/${quizId}`);
    }

    getQuizzes() {
        return this.http.get('/api/quizzes');
    }

    getAllQuizzes() {
        return this.http.get('/api/quizzes/all');
    }
}
