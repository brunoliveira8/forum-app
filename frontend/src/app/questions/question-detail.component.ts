import { Component, OnInit } from '@angular/core';

import { ForumService } from './forum.service';
import { ActivatedRoute } from '@angular/router';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styles: []
})
export class QuestionDetailComponent implements OnInit, OnDestroy {

  question: any;
  private sub: any;

  constructor(private formService: ForumService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const questionId = params['id'];
      this.formService.getQuestion(questionId).subscribe(data => {
        this.question = data;
      });
   });
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }
}
