import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NotificationsService } from 'angular2-notifications';

import { AuthService } from './../auth/auth.service';
import { ForumService } from './forum.service';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styles: []
})
export class QuestionDetailComponent implements OnInit, OnDestroy {

  private sub: any;
  private questionId;

  question: any;
  autUser: any;
  answerForm: FormGroup;
  isEditable = false;
  titleEdit: string;
  descriptionEdit: string;

  constructor(private forumService: ForumService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private notifications: NotificationsService,
    public authService: AuthService ) {
      this.answerForm = this.formBuilder.group({
        'text': ['', Validators.required]
      });
    }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.questionId = params['id'];
      this.forumService.getQuestion(this.questionId).subscribe(data => {
        this.question = data;
      });
   });
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  onAnswerSubmit(){
    this.forumService.createAnswer(this.answerForm.value.text, this.questionId).subscribe(data => {
      this.question.answers.push(data);
    });
    this.answerForm.reset();
  }

  onEdit(){
    this.isEditable = true;
  }

  onEditSave(){
    const title = this.titleEdit || this.question.title;
    const description = this.descriptionEdit || this.question.description;
    this.forumService.updateQuestion(this.question.id, title, description).subscribe(
      data => {
        this.question.title = data['title'];
        this.question.description = data['description'];
        this.notifications.success("Question was updated succesfully!")
      },
      err => {
        this.notifications.error("Ops! Something went wrong.", err['error']['detail']);
      }
    );
    this.isEditable = false;
    this.titleEdit = null;
    this.descriptionEdit = null;
  }

  onEditCancel(){
    this.isEditable = false;
    this.titleEdit = null;
    this.descriptionEdit = null;
  }

  onDelete(){
    this.forumService.deleteQuestion(this.questionId).subscribe(
      data => {
        this.router.navigate(['/questions', "me"]);
      },
      err => {
        this.notifications.error("Ops! Something went wrong.", err['error']['detail']);
      }
    )
  }
}
