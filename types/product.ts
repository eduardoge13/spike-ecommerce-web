export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number; // Price in MXN cents (e.g., 10000 = $100.00 MXN)
  originalPrice?: number; // Original price before discount, in MXN cents
  image: string;
  images?: string[]; // Additional images
  category?: string;
  stock?: number;
  sku?: string;
  isNew?: boolean;
  badgeText?: string; // Custom pill text set by admins; overrides the auto savings label
  whatsappMessage?: string; // Pre-filled WhatsApp message for this product
}

export interface CartItem extends Product {
  quantity: number;
}
