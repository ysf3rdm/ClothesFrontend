import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { UserModel } from '../models/userModel';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = 'https://localhost:44372/api/auth/';
  constructor(private httpClient: HttpClient) {}
  login(user: LoginModel) {
    return this.httpClient.post<SingleResponseModel<UserModel>>(
      this.apiUrl + 'login',
      user
    );
  }
  isAuthenticated() {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }
  register(user: RegisterModel) {
    return this.httpClient.post<SingleResponseModel<UserModel>>(
      this.apiUrl + 'register',
      user
    );
  }
}
