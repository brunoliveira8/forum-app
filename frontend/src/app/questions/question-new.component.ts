import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ForumService } from './forum.service';

import * as _ from "lodash";
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-question-new',
  templateUrl: './question-new.component.html',
  styles: []
})
export class QuestionNewComponent implements OnInit {

  createQuestionForm: FormGroup;
  topics: {id: string, text: string};
  createQuestionErrors: any;

  constructor(private forumService: ForumService, private formBuilder: FormBuilder) {
    this.createQuestionForm = this.formBuilder.group({
      'title': ['', Validators.required],
      'topics': ['', Validators.required],
      'description': ['', Validators.required],
    });
  }

  ngOnInit() {
    this.forumService.getTopics().subscribe((data: any[]) => {
        this.topics = _.map(data, value => { return { id: value.id, text: value.name} });
    });
  }

  onSubmit(){
    console.log(this.createQuestionForm.value);
    this.forumService.createQuestion(
      this.createQuestionForm.value.title,
      _.map(this.createQuestionForm.value.topics, e => e.id),
      this.createQuestionForm.value.description
    ).subscribe(
      data => {},
      err => {
        this.createQuestionErrors = err['errors'];
      }
    );

    this.createQuestionForm.reset();
  }
}
