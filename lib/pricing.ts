export function formatMXNFromCents(cents: number) {
  return new Intl.NumberFormat('es-MX', {
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

export function getSavingsLabel(price: number, originalPrice?: number) {
  if (!originalPrice || originalPrice <= price) {
    return null;
  }

  return `Ahorra $${formatMXNFromCents(originalPrice - price)}`;
}
