'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { WHATSAPP_NUMBER } from '@/lib/constants';
import ShowroomIcon from './ShowroomIcon';

const navigation = [
  { href: '/productos', label: 'Productos' },
  { href: '/como-comprar', label: 'Cómo comprar' },
  { href: '/pago-seguro', label: 'Pago seguro' },
];

const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hola! Quiero conocer los productos disponibles en Punto Clave MX.')}`;

export default function ShowroomHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [menuOpen]);

  return (
    <>
      <div className="announcement-rail">
        <div className="announcement-track" aria-label="Beneficios de compra">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center gap-10 px-5" aria-hidden={copy === 1}>
              <span>Envíos a todo México</span><span>Pago protegido con Stripe</span><span>Productos originales</span><span>Atención directa por WhatsApp</span>
            </div>
          ))}
        </div>
      </div>
      <header className="showroom-header">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
          <Link href="/" aria-label="Punto Clave MX, inicio" className="brand-lockup">
            <Image src="/logo-wide.jpeg" alt="Punto Clave MX" width={200} height={60} className="h-10 w-auto object-contain sm:h-11" priority />
          </Link>
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Navegación principal">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} className={`showroom-nav-link ${pathname === item.href ? 'is-active' : ''}`} aria-current={pathname === item.href ? 'page' : undefined}>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="hidden items-center gap-3 md:flex">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="button-ghost"><ShowroomIcon name="whatsapp" className="h-4 w-4" /> WhatsApp</a>
            <Link href="/productos" className="button-primary">Explorar tienda</Link>
          </div>
          <button type="button" className="showroom-menu-button md:hidden" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-controls="showroom-mobile-navigation" aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}>
            <ShowroomIcon name={menuOpen ? 'close' : 'menu'} />
          </button>
        </div>
        {menuOpen && (
          <div id="showroom-mobile-navigation" className="showroom-mobile-menu md:hidden">
            {navigation.map((item) => <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</Link>)}
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </div>
        )}
      </header>
    </>
  );
}
