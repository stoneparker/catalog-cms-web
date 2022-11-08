export interface Product {
  _id: string,
  name: string,
  description: string,
  imageUrl: string,
  price: number,
  availableQuantity: number,
  barcode: string,
}

export interface ShowModalProps {
  show: boolean;
  product?: Product;
}

