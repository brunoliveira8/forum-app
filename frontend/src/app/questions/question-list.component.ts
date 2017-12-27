import { Component, OnInit } from '@angular/core';
import { ForumService } from './forum.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styles: []
})
export class QuestionListComponent implements OnInit {

  questionsFound: any;

  constructor(private forumService: ForumService) { }

  ngOnInit() {
    this.forumService.getQuestions().subscribe(data => this.questionsFound = data);
  }

}
