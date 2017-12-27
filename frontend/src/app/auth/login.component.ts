import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from './auth.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit,OnDestroy {

  loginForm: FormGroup;
  successfulLogin: Subscription;
  loginErrors: any;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private renderer: Renderer2) {
    this.loginForm = this.formBuilder.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required],
    });
  }

  ngOnInit() {
    this.renderer.addClass(document.body, 'login-page');
    this.renderer.addClass(document.body, 'hold-transition');

    this.successfulLogin = this.authService.successfulLogin.subscribe(data =>{
      if (data['success'] == false){
        this.loginErrors = data['messages'];
      }
      else {
        //navigate to home page
      }
    });
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'login-page');
    this.renderer.removeClass(document.body, 'hold-transition');

    this.successfulLogin.unsubscribe();
  }

  login(){
    this.authService.login(this.loginForm.value.username, this.loginForm.value.password);
    console.log(this.loginForm);
  }

}
