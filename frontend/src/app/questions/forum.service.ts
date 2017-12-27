import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { AuthService } from './../auth/auth.service';

@Injectable()
export class ForumService {
  private apiUrl = environment.apiUrl + "api/";
  private topicUrl = this.apiUrl + "topics";
  private questionUrl = this.apiUrl + 'questions';
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
      {title: title, topics: topics, description: description},
      {headers: this.headers}
    )
  }

}
