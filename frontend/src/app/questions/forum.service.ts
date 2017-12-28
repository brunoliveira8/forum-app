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

  constructor(private authService: AuthService, private http: HttpClient) {}

  getTopics(){
    return this.http.get(
      this.topicUrl,
      { headers: new HttpHeaders().set('Authorization', 'Token ' + this.authService.authToken) }
    )
  }

  createQuestion(title: string, topics: string[], description: string) {
    return this.http.post(
      this.questionUrl,
      { title: title, topics: topics, description: description },
      { headers: new HttpHeaders().set('Authorization', 'Token ' + this.authService.authToken) }
    )
  }

  updateQuestion(questionId: string, title: string, description: string) {
    return this.http.patch(
      this.questionUrl + "/" + questionId,
      { title: title, description: description },
      { headers: new HttpHeaders().set('Authorization', 'Token ' + this.authService.authToken) }
    )
  }

  getQuestion(questionId: string){
    return this.http.get(
      this.questionUrl + "/" + questionId,
      { headers: new HttpHeaders().set('Authorization', 'Token ' + this.authService.authToken) }
    )
  }

  getQuestions(filter:any = {}){
    return this.http.get(
      this.questionUrl,
      {
        headers: new HttpHeaders().set('Authorization', 'Token ' + this.authService.authToken),
        params: filter
      }
    )
  }

  createAnswer(text: string, questionId: string){
    return this.http.post(
      this.answerUrl,
      { text: text, question: questionId },
      { headers: new HttpHeaders().set('Authorization', 'Token ' + this.authService.authToken) }
    )
  }

  getAnswers(filter:any = {}){
    return this.http.get(
      this.answerUrl,
      {
        headers: new HttpHeaders().set('Authorization', 'Token ' + this.authService.authToken),
        params: filter
      }
    )
  }

}
