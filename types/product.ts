export interface Product {
  id: string;
  name: string;
  description: string;
  price: number; // Price in MXN cents (e.g., 10000 = $100.00 MXN)
  image: string;
  images?: string[]; // Additional images
  category?: string;
  stock?: number;
  sku?: string;
}

export interface CartItem extends Product {
  quantity: number;
}
