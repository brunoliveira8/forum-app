import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './auth/login.component';
import { SignupComponent } from './auth/signup.component';
import { QuestionsComponent } from './questions/questions.component';
import { QuestionNewComponent } from './questions/question-new.component';
import { AuthGuard } from './auth/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'questions', pathMatch: 'full' },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: SignupComponent },
  { path: 'questions', component: QuestionsComponent, canActivate: [AuthGuard],
    children: [
      { path: 'new', component: QuestionNewComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
