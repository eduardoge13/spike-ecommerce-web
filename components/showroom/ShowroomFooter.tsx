import Image from 'next/image';
import Link from 'next/link';

export default function ShowroomFooter() {
  return (
    <footer className="showroom-footer">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-5 py-8 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
        <Link href="/" aria-label="Ir al inicio"><Image src="/logo-wide.jpeg" alt="Punto Clave MX" width={180} height={54} className="h-10 w-auto object-contain" /></Link>
        <p>© 2026 Punto Clave MX · Tecnología premium en México</p>
        <div><span>Stripe</span><span>SPEI</span><span>WhatsApp</span></div>
      </div>
    </footer>
  );
}
