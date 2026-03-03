import { MercadoPagoConfig, Preference } from 'mercadopago';

export const mercadopago = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
});

export const preference = new Preference(mercadopago);
