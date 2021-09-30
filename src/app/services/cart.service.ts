import { Injectable } from '@angular/core';
import { CartItem } from '../models/cartItem';
import { CartItems } from '../models/cartItems';
import { Clothes } from '../models/clothes';
import { ClothesDetail } from '../models/clothesDetail';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  totalPrice: number = 0;
  totalQuantity: number = 0;
  constructor() {}
  addToCart(clothes: ClothesDetail, quantityOfClothes: number): number {
    let item = CartItems.find((c) => c.clothes.id === clothes.id);
    if (item) {
      item.quantity += quantityOfClothes;
    } else {
      let cartItem = new CartItem();
      cartItem.quantity = quantityOfClothes;
      cartItem.clothes = clothes;
      CartItems.push(cartItem);
    }
    this.totalPrice += clothes.clothesPrice * quantityOfClothes;
    return this.totalPrice;
  }
  list(): CartItem[] {
    return CartItems;
  }

  calculateQuantity(): any {
    CartItems.forEach((element) => (this.totalQuantity += element.quantity));
    return this.totalQuantity;
  }
}
