import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styles: []
})
export class SignupComponent implements OnInit, OnDestroy {

  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private renderer: Renderer2) {
    this.registerForm = this.formBuilder.group({
      'username': ['', Validators.required],
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', Validators.required],
    });
  }

  ngOnInit() {
    this.renderer.addClass(document.body, 'register-page');
    this.renderer.addClass(document.body, 'hold-transition');
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'register-page');
    this.renderer.removeClass(document.body, 'hold-transition');
  }

  register(){
    console.log(this.registerForm.value);

  }
}
