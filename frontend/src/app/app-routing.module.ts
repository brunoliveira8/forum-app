import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './auth/login.component';
import { SignupComponent } from './auth/signup.component';
import { QuestionsComponent } from './questions/questions.component';
import { QuestionListComponent } from './questions/question-list.component';
import { QuestionNewComponent } from './questions/question-new.component';
import { MyQuestionsComponent } from './questions/my-questions.component';
import { AuthGuard } from './auth/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'questions', pathMatch: 'full' },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: SignupComponent },
  { path: 'questions', component: QuestionsComponent, canActivate: [AuthGuard],
    children: [
      { path: "", component: QuestionListComponent},
      { path: 'new', component: QuestionNewComponent},
      { path: 'me', component: MyQuestionsComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
