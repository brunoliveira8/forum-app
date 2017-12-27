import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';



import { environment } from '../../environments/environment';
import { Subject } from 'rxjs/Subject';

interface User {
    id: number,
    username: string,
    email: string
};

@Injectable()
export class AuthService {
  private authUrl = environment.apiUrl + "api-auth/";

  public authToken: string;
  public authUser: User;
  public successfulLogin = new Subject<{success: boolean, messages: any}>();
  public successfulRegistration = new Subject<{success: boolean, messages: any}>();

  constructor(private http: HttpClient) { }

  login(username: string , password: string){
    const loginUrl = this.authUrl + "token/create/";
    this.http.post(loginUrl, {username: username, password: password}).subscribe(
      data => {
        this.authToken = data['auth_token'];
        this.setAuthUser(this.authToken);
        this.successfulLogin.next({ success: true, messages: "" });
      },
      err => {
        this.successfulLogin.next({ success: false, messages: err['error'] });
      }
    );
  }

  private setAuthUser(authToken: string){
    const authUserUrl = this.authUrl + "me/";
    this.http.get<User>(authUserUrl, {
      headers: new HttpHeaders().set('Authorization', 'Token ' + authToken)
      }
    ).subscribe(data => {
      this.authUser = data;
    });
  }

  isAuthenticated() {
    return this.authToken != null;
  }

  register(username: string, email: string, password: string){
    const registerUrl = this.authUrl + "users/create/";
    this.http.post(registerUrl, {username: username, email:email, password: password}).subscribe(
      data => {
        this.successfulRegistration.next({ success: true, messages: "" });
      },
      err => {
        this.successfulRegistration.next({ success: false, messages: err['error'] });
      }
    );
  }

}
