import { Component, Input, OnInit, Output } from '@angular/core';
import { CartItem } from 'src/app/models/cartItem';
import { CartItems } from 'src/app/models/cartItems';
import { CartService } from 'src/app/services/cart.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-bag-summary',
  templateUrl: './bag-summary.component.html',
  styleUrls: ['./bag-summary.component.css'],
})
export class BagSummaryComponent implements OnInit {
  cartItems: typeof CartItems;
  cartItem: CartItem;
  @Input() totalPrice: number;
  constructor(
    private cartService: CartService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.getBag();
  }
  getBag() {
    let number = parseInt(this.localStorageService.getNumber() || '');
    for (let i = 0; i < number; i++) {
      this.cartItems[i] = JSON.parse(
        localStorage.getItem('clothes' + i) || '{}'
      );
      console.log(this.cartItems[i]);
    }
    this.calculateTotalPrice();
  }
  calculateTotalPrice() {
    this.totalPrice = 0;
    for (let i = 0; i < this.cartItems.length; i++) {
      this.totalPrice +=
        this.cartItems[i].clothes.clothesPrice * this.cartItems[i].quantity;
    }
  }
  deleteClothesFromBag(index: number) {
    this.cartItems.forEach((clothes, index) => {
      this.cartItems.splice(index, 1);
    });
  }
}
