import { Component, OnInit } from '@angular/core';

import { ForumService } from './forum.service';
import { AuthService } from './../auth/auth.service';

@Component({
  selector: 'app-my-questions',
  templateUrl: './my-questions.component.html',
  styles: []
})
export class MyQuestionsComponent implements OnInit {

  myQuestions: any;

  constructor(private forumService: ForumService, private authService: AuthService) { }

  ngOnInit() {
    this.forumService.getQuestions({owner: this.authService.authUser.id}).subscribe(data => {
      this.myQuestions = data;
    });
  }

}
