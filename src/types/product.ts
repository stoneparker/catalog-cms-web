export interface Product {
  _id: string,
  name: string,
  description: string,
  imageUrl: string,
  price: string,
  availableQuantity: number,
  barcode: string,
}

export interface ShowModalProps {
  show: boolean;
  product?: Product;
}

