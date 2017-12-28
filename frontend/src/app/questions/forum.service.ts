import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { AuthService } from './../auth/auth.service';


@Injectable()
export class ForumService {

  private apiUrl = environment.apiUrl + "api/";
  private topicUrl = this.apiUrl + "topics";
  private questionUrl = this.apiUrl + 'questions';
  private answerUrl = this.apiUrl + 'answers';
  private headers: HttpHeaders;

  constructor(private authService: AuthService, private http: HttpClient) {
    this.headers = new HttpHeaders().set('Authorization', 'Token ' + this.authService.authToken);
  }

  getTopics(){
    return this.http.get(
      this.topicUrl,
      { headers: this.headers }
    )
  }

  createQuestion(title: string, topics: string[], description: string) {
    return this.http.post(
      this.questionUrl,
      { title: title, topics: topics, description: description },
      { headers: this.headers }
    )
  }

  getQuestion(questionId: string){
    return this.http.get(
      this.questionUrl + "/" + questionId,
      { headers: this.headers }
    )
  }

  getQuestions(filter:any = {}){
    return this.http.get(
      this.questionUrl,
      { headers: this.headers, params: filter }
    )
  }

  createAnswer(text: string, questionId: string){
    return this.http.post(
      this.answerUrl,
      { text: text, question: questionId },
      { headers: this.headers }
    )
  }

  getAnswers(filter:any = {}){
    return this.http.get(
      this.answerUrl,
      { headers: this.headers, params: filter }
    )
  }

}
