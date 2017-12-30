import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styles: []
})
export class SignupComponent implements OnInit, OnDestroy {

  registerForm: FormGroup;
  successfulRegistration: Subscription;
  registerErrors: any;
  registerDone = false;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private renderer: Renderer2) {
    this.registerForm = this.formBuilder.group({
      'username': ['', Validators.required],
      'email': ['', Validators.required],
      'password': ['', Validators.required],
      'tos': ['', Validators.required]
    });
  }

  ngOnInit() {
    this.renderer.addClass(document.body, 'register-page');
    this.renderer.addClass(document.body, 'hold-transition');

    this.successfulRegistration = this.authService.successfulRegistration.subscribe(data =>{
      if (data['success'] == false){
        this.registerErrors = data['messages'];
      }
      else {
        this.registerDone = true;
      }
    });
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'register-page');
    this.renderer.removeClass(document.body, 'hold-transition');
  }

  register(){
    this.authService.register(
      this.registerForm.value.username,
      this.registerForm.value.email,
      this.registerForm.value.password
    );
  }
}
