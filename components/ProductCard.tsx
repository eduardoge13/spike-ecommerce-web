'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import StripeCheckoutButton from '@/components/StripeCheckoutButton';
import { WHATSAPP_NUMBER } from '@/lib/constants';
import { formatMXNFromCents, getSavingsLabel } from '@/lib/pricing';
import { getProductPath } from '@/lib/seo';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
  index?: number;
}

function getWhatsAppLink(product: Product) {
  const message = product.whatsappMessage || `Hola! Me interesa el ${product.name}. Esta disponible?`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const originalPrice = product.originalPrice ? formatMXNFromCents(product.originalPrice) : null;
  const savingsLabel = product.badgeText ?? getSavingsLabel(product.price, product.originalPrice);
  const isOutOfStock = product.stock !== undefined && product.stock <= 0;
  const productPath = getProductPath(product);

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (event.pointerType === 'touch' || !cardRef.current) return;
    const bounds = cardRef.current.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    cardRef.current.style.setProperty('--tilt-x', `${(0.5 - y) * 5}deg`);
    cardRef.current.style.setProperty('--tilt-y', `${(x - 0.5) * 6}deg`);
    cardRef.current.style.setProperty('--shine-x', `${x * 100}%`);
    cardRef.current.style.setProperty('--shine-y', `${y * 100}%`);
  };

  const resetTilt = () => {
    cardRef.current?.style.setProperty('--tilt-x', '0deg');
    cardRef.current?.style.setProperty('--tilt-y', '0deg');
  };

  return (
    <article
      ref={cardRef}
      id={`producto-${product.id}`}
      className="showroom-product-card"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      data-catalog-card
      style={{ animationDelay: `${Math.min(index, 3) * 80}ms` } as React.CSSProperties}
    >
      <div className="product-card-shine" />
      <div className="product-card-topline"><span>{product.category ?? 'Tecnología'}</span><span>{String(index + 1).padStart(2, '0')}</span></div>
      <Link href={productPath} className="product-card-image" aria-label={`Ver detalles de ${product.name}`}>
        <div className="product-card-orbit" aria-hidden="true" />
        <Image src={product.image} alt={product.name} fill sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 25vw" className="object-contain" />
        {savingsLabel && <span className="discount-pill">{savingsLabel}</span>}
        {isOutOfStock ? <span className="stock-pill is-out">Agotado</span> : product.stock !== undefined && product.stock < 5 ? <span className="stock-pill">Sólo {product.stock}</span> : null}
      </Link>

      <div className="product-card-content">
        <div><h3><Link href={productPath}>{product.name}</Link></h3><p>{product.description}</p></div>
        <div className="product-card-pricing">
          <div>{originalPrice && <span>Antes ${originalPrice}</span>}<strong>${formatMXNFromCents(product.price)} <small>MXN</small></strong></div>
          <Link href={productPath} aria-label={`Abrir ${product.name}`} className="product-detail-arrow">↗</Link>
        </div>
        <div className="product-card-actions">
          {isOutOfStock ? <button type="button" disabled className="product-out-button">Agotado</button> : <StripeCheckoutButton productId={product.id} productName={product.name} variant="showroom" />}
          <a href={getWhatsAppLink(product)} target="_blank" rel="noopener noreferrer" className="product-whatsapp-button" aria-label={`Comprar ${product.name} por WhatsApp`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20 11.6a8 8 0 0 1-11.8 7L3 20l1.4-5A8 8 0 1 1 20 11.6Z" /><path d="M8 8c.5 4 3.5 7 7.5 7.5" /></svg>
          </a>
        </div>
      </div>
    </article>
  );
}
