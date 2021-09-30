import { ClothesSize } from './clothesSize';

export interface ClothesDetail extends ClothesSize {
  id: number;
  clothesId: number;
  categoryId: number;
  brandId: number;
  categoryName: string;
  brandName: string;
  clothesName: string;
  clothesInStock: number;
  clothesPrice: number;
  imagePath: string;
}
