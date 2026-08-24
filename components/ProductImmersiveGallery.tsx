'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';

interface ProductImmersiveGalleryProps {
  name: string;
  images: string[];
  badge?: string | null;
  isOutOfStock: boolean;
}

export default function ProductImmersiveGallery({ name, images, badge, isOutOfStock }: ProductImmersiveGalleryProps) {
  const [activeImage, setActiveImage] = useState(images[0]);
  const stageRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'touch' || !stageRef.current) return;
    const bounds = stageRef.current.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    stageRef.current.style.setProperty('--gallery-rx', `${y * -3}deg`);
    stageRef.current.style.setProperty('--gallery-ry', `${x * 4}deg`);
  };

  const reset = () => {
    stageRef.current?.style.setProperty('--gallery-rx', '0deg');
    stageRef.current?.style.setProperty('--gallery-ry', '0deg');
  };

  return (
    <div className="immersive-gallery">
      <div ref={stageRef} className="immersive-gallery-stage" onPointerMove={handlePointerMove} onPointerLeave={reset}>
        <div className="immersive-gallery-orbit" aria-hidden="true" />
        <Image key={activeImage} src={activeImage} alt={name} fill priority sizes="(max-width: 1024px) 100vw, 55vw" className="object-contain" />
        {badge && <span className="discount-pill immersive-gallery-badge">{badge}</span>}
        {isOutOfStock && <span className="immersive-gallery-stock">Agotado</span>}
        <span className="immersive-gallery-counter">{String(images.indexOf(activeImage) + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}</span>
      </div>
      {images.length > 1 && (
        <div className="immersive-gallery-thumbs" role="list" aria-label="Imágenes del producto">
          {images.map((image, index) => (
            <button key={image} type="button" onClick={() => setActiveImage(image)} className={image === activeImage ? 'is-active' : ''} aria-label={`Ver imagen ${index + 1} de ${name}`} aria-pressed={image === activeImage}>
              <Image src={image} alt="" fill className="object-contain" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
