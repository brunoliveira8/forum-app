import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { SelectModule } from 'ng2-select';
import { SimpleNotificationsModule } from 'angular2-notifications';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login.component';
import { SignupComponent } from './auth/signup.component';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth-guard.service';
import { QuestionsComponent } from './questions/questions.component';
import { QuestionNewComponent } from './questions/question-new.component';
import { HeaderComponent } from './header.component';
import { ForumService } from './questions/forum.service';
import { QuestionListComponent } from './questions/question-list.component';
import { MyQuestionsComponent } from './questions/my-questions.component';
import { QuestionDetailComponent } from './questions/question-detail.component';
import { AnswerListComponent } from './answers/answer-list.component';
import { FooterComponent } from './footer.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    QuestionsComponent,
    QuestionNewComponent,
    HeaderComponent,
    QuestionListComponent,
    MyQuestionsComponent,
    QuestionDetailComponent,
    AnswerListComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SelectModule,
    SimpleNotificationsModule.forRoot()

  ],
  providers: [AuthService, AuthGuard, ForumService],
  bootstrap: [AppComponent]
})
export class AppModule { }
