import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ForumService } from './forum.service';

import * as _ from "lodash";


@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styles: []
})
export class QuestionListComponent implements OnInit {

  searchForm: FormGroup;
  questionsFound: any;
  topics: {id: string, text: string};

  constructor(private forumService: ForumService, private formBuilder: FormBuilder) {
    this.searchForm = this.formBuilder.group({
      'search': ['', Validators.required],
      'topics': ['', Validators.required],
    });
   }

  ngOnInit() {
    this.forumService.getTopics().subscribe((data: any[]) => {
      this.topics = _.map(data, value => { return { id: value.id, text: value.name} });
    });
  }

  onSubmit(){
    let filter = {};
    const searchTerm = this.searchForm.value.search;
    const topicsSelected = this.searchForm.value.topics;

    if (searchTerm != ""){
      filter['search']=searchTerm;
    }

    if (topicsSelected != ""){
      filter['topics'] = _.map(topicsSelected, e => e.id);
    }

    this.forumService.getQuestions(filter).subscribe(data => this.questionsFound = data);

  }

}
