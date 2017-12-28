import { Component, OnInit } from '@angular/core';

import { ForumService } from './../questions/forum.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-answer-list',
  templateUrl: './answer-list.component.html',
  styles: []
})
export class AnswerListComponent implements OnInit {

  myAnswers: any;

  constructor(private forumService: ForumService, private authService: AuthService) { }

  ngOnInit() {
    this.forumService.getAnswers({owner: this.authService.authUser.id}).subscribe(data =>{
      this.myAnswers = data;
    });
  }

}
