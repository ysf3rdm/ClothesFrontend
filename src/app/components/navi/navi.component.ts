import { Component, Input, OnInit, Output } from '@angular/core';
import { CartItem } from 'src/app/models/cartItem';
import { CartItems } from 'src/app/models/cartItems';
import { CartService } from 'src/app/services/cart.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css'],
})
export class NaviComponent implements OnInit {
  firstName = '';
  cartItems: CartItem[];
  @Output() filterText = '';
  @Input() totalPrice: number = 0;
  constructor(
    private cartService: CartService,
    private localStorage: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.getBag();
    this.calculateTotalPrice();
  }
  getBag() {
    this.cartItems = this.cartService.list();
  }

  getFirstName() {
    this.firstName = localStorage.getItem('firstName')!;
    if (this.localStorage.getFirstName() === null) {
      return true;
    } else {
      return false;
    }
  }
  calculateTotalPrice() {
    this.totalPrice = 0;
    for (let i = 0; i < CartItems.length; i++) {
      this.totalPrice +=
        CartItems[i].clothes.clothesPrice * CartItems[i].quantity;
    }
  }
}
