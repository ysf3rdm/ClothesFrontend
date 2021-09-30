import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartItems } from 'src/app/models/cartItems';
import { Clothes } from 'src/app/models/clothes';
import { ClothesDetail } from 'src/app/models/clothesDetail';
import { ClothesImage } from 'src/app/models/clothesImage';
import { ClothesSize } from 'src/app/models/clothesSize';
import { CartService } from 'src/app/services/cart.service';
import { ClothesImageService } from 'src/app/services/clothes-image.service';
import { ClothesService } from 'src/app/services/clothes.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-clothes-detail',
  templateUrl: './clothes-detail.component.html',
  styleUrls: ['./clothes-detail.component.css'],
})
export class ClothesDetailComponent implements OnInit {
  quantityForm: FormGroup;
  quantityOfClothes: number = 1;
  selectedClothes: ClothesDetail;
  selectedSize: ClothesSize;
  sizes: ClothesSize[];
  $totalPrice: number;
  clothesDetail: ClothesDetail;
  numberOfClothes = 1;
  clothesImages: ClothesImage[];

  constructor(
    private clothesImageService: ClothesImageService,
    private activatedRoute: ActivatedRoute,
    private clothesService: ClothesService,
    private toastrService: ToastrService,
    private cartService: CartService,
    private formBuilder: FormBuilder,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.getImagesByClothesId(params['clothesId']);
      this.getClothesDetailById(params['clothesId']);
      this.getClothesSizes(params['clothesId']);
      this.createQuantityForm();
      this.calculateTotalPrice();
    });
  }
  createQuantityForm() {
    this.quantityForm = this.formBuilder.group({
      quantity: [this.quantityOfClothes, Validators.required],
    });
    this.quantityOfClothes = 1;
  }
  getImagesByClothesId(Id: number) {
    this.clothesImageService.getImagesByClothesId(Id).subscribe((response) => {
      this.clothesImages = response.data;
    });
  }
  getClothesDetailById(Id: number) {
    this.clothesService.getClothesDetailById(Id).subscribe((response) => {
      this.clothesDetail = response.data[0];
    });
  }

  addToBag() {
    if (this.selectedSize == undefined) {
      this.toastrService.info('Hata', 'Beden Seçiniz');
    } else {
      this.localStorageService.setBag(
        this.selectedClothes,
        this.quantityOfClothes
      );
      this.toastrService.success('Sepete Eklendi', 'Başarılı');
      this.$totalPrice = this.cartService.addToCart(
        this.selectedClothes,
        this.quantityOfClothes
      );
      this.calculateTotalPrice();
    }
  }
  getClothesSizes(clothesId: number) {
    this.clothesService
      .getClothesSizesByClothesId(clothesId)
      .subscribe((response) => {
        this.sizes = response.data;
      });
  }
  selectSize(size: ClothesSize) {
    this.selectedSize = size;
    this.clothesService
      .getClothesBySizeAndClothesId(
        this.clothesDetail.clothesId,
        this.selectedSize.id
      )
      .subscribe((response) => {
        this.selectedClothes = response.data[0];
      });
  }
  addQuantity() {
    this.quantityOfClothes += 1;
  }
  deleteQuantity() {
    4;
    if (this.quantityOfClothes === 1) {
      this.quantityOfClothes = 1;
    } else {
      this.quantityOfClothes -= 1;
    }
  }
  calculateTotalPrice() {
    this.$totalPrice = 0;
    for (let i = 0; i < CartItems.length; i++) {
      this.$totalPrice +=
        CartItems[i].clothes.clothesPrice * CartItems[i].quantity;
    }
  }
}
