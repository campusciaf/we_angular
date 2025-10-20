export interface Installment {
  id: number;
  cuota: number;
  valor_formato: number;
  pagado: number;
  fecha_limite_pago: string;
  plazo: string;
  atraso: number;
  id_credito: string;
}

export interface PaymentCreationResponse {
  transaction_id: string;
  payment_url: string;
  html: string;
  message: string;
  success: boolean;
}

export interface PaymentMethod {
  id: string;
  name: string;
  logoUrl: string;
}
