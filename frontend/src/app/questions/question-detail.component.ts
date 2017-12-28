import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ForumService } from './forum.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styles: []
})
export class QuestionDetailComponent implements OnInit, OnDestroy {

  private sub: any;
  private questionId;
  question: any;
  answerForm: FormGroup;

  constructor(private formService: ForumService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) {
      this.answerForm = this.formBuilder.group({
        'text': ['', Validators.required]
      });
    }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.questionId = params['id'];
      this.formService.getQuestion(this.questionId).subscribe(data => {
        this.question = data;
      });
   });
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  onAnswerSubmit(){
    this.formService.createAnswer(this.answerForm.value.text, this.questionId).subscribe(data => {
      this.question.answers.push(data);
    });
    this.answerForm.reset();
  }
}
