import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartItems } from 'src/app/models/cartItems';
import { ClothesDetail } from 'src/app/models/clothesDetail';
import { ClothesSize } from 'src/app/models/clothesSize';
import { CartService } from 'src/app/services/cart.service';
import { ClothesService } from 'src/app/services/clothes.service';

@Component({
  selector: 'app-clothes',
  templateUrl: './clothes.component.html',
  styleUrls: ['./clothes.component.css'],
})
export class ClothesComponent implements OnInit {
  emptynumber = 0;
  clothesDetails: ClothesDetail[];
  $totalPrice: number = 0;
  totalQuantity = 0;
  filterText = '';
  constructor(
    private clothesService: ClothesService,
    private cartService: CartService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getClothesDetail();
  }
  getClothesDetail() {
    this.clothesService.getClothesDetail().subscribe((response) => {
      this.clothesDetails = response.data;
      for (let i = 0; i < this.clothesDetails.length; i++) {
        for (let y = 1; y < this.clothesDetails.length; y++) {
          if (i != y) {
            if (
              this.clothesDetails[i].clothesId ==
              this.clothesDetails[y].clothesId
            ) {
              this.clothesDetails.splice(y, 1);
            }
          }
        }
      }
    });
  }
  addToBag(clothes: ClothesDetail) {
    this.toastrService.success('Sepete Eklendi', 'Başarılı');
    this.cartService.addToCart(clothes, 1);
    this.totalQuantity = this.cartService.calculateQuantity();
    this.calculateTotalPrice();
  }
  calculateTotalPrice() {
    this.$totalPrice = 0;
    for (let i = 0; i < CartItems.length; i++) {
      this.$totalPrice +=
        CartItems[i].clothes.clothesPrice * CartItems[i].quantity;
    }
  }
}
