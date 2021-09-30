import { Injectable } from '@angular/core';
import { CartItem } from '../models/cartItem';
import { Claim } from '../models/claim';
import { ClothesDetail } from '../models/clothesDetail';
import { UserModel } from '../models/userModel';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  bag: ClothesDetail[];
  number: number;
  constructor() {}
  set(user: UserModel) {
    localStorage.setItem('expiration', user.expiration);
    localStorage.setItem('firstName', user.firstName);
    localStorage.setItem('lastName', user.lastName);
    localStorage.setItem('token', user.token);
    localStorage.setItem('email', user.email);
    localStorage.setItem('userId', user.userId.toString());
  }
  getFirstName() {
    return localStorage.getItem('firstName');
  }
  getLastName() {
    return localStorage.getItem('lastName');
  }
  getEmail() {
    return localStorage.getItem('email');
  }
  logOut() {
    localStorage.clear();
  }
  setClaims(claim: Claim[]) {
    localStorage.setItem('claim', claim[0]?.name);
  }
  getExpiration() {
    return localStorage.getItem('expiration');
  }
  getNumber() {
    return localStorage.getItem('number');
  }
  getBag() {
    this.number = parseInt(localStorage.getItem('number') || '0');
    return JSON.stringify(localStorage.getItem('clothes'));
  }
  setBag(clothesDetail: ClothesDetail, quantity: number) {
    this.number = parseInt(localStorage.getItem('number') || '0');
    console.log(this.number);
    if (this.number === 0) {
      localStorage.setItem('number', '0');
      const cartItem: CartItem = { clothes: clothesDetail, quantity: quantity };
      cartItem.clothes = clothesDetail;
      cartItem.quantity = quantity;
      localStorage.setItem('clothes' + this.number, JSON.stringify(cartItem));
      this.number++;
      console.log(this.number);
    } else {
    }
    const cartItem: CartItem = { clothes: clothesDetail, quantity: quantity };
    cartItem.clothes = clothesDetail;
    cartItem.quantity = quantity;
    localStorage.setItem('clothes' + this.number, JSON.stringify(cartItem));
    this.number++;
    localStorage.setItem('number', JSON.stringify(this.number));
  }
}
