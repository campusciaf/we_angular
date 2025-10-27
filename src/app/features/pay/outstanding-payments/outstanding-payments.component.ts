import { Component, Renderer2, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Offcanvas } from 'bootstrap';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserState } from '@/app/state/user.reducer';
import { Installment } from '@/app/clases/payment';
import { PayService } from '@/app/core/services/pay.service';
import { DOCUMENT } from '@angular/common';

import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

declare let alertify: any;

@Component({
  selector: 'app-outstanding-payments',
  templateUrl: './outstanding-payments.component.html',
  styleUrls: ['./outstanding-payments.component.css'],
})
export class OutstandingPaymentsComponent {
  installments: Installment[] = [];
  loading = false;
  saldoDebito = 0;

  userDocument = 0;
  user = new Observable<UserState>();

  selected: any = null;
  paymentHtml: string = '';
  selectedMethod: string = '';
  selectedOption: string = '';
  customAmount: number | null = null;
  computedAmount: number | undefined = 0;
  step: number = 1;

  paymentMethods = [
    { id: 'pse', name: 'PSE (Transferencia)' },
    { id: 'card', name: 'Tarjeta de crédito/débito' },
    { id: 'cash', name: 'Pago en efectivo' },
  ];

  paymentOptions = [
    { id: 'pago_minimo', label: 'Pago Mínimo', amount: 312640 },
    { id: 'pago_total', label: 'Pago Total', amount: 937920 },
    { id: 'pago_parcial', label: 'Otro Valor' },
  ];

  constructor(
    private store: Store<{ user: UserState }>,
    private svc: PayService,
    private router: Router,
    private renderer: Renderer2,
    private renderere: Renderer2,
    private sanitizer: DomSanitizer,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.loadAll();
  }

  loadAll() {
    this.loading = true;
    this.store.select('user').subscribe(userData => {
      if (!userData.documento) {
        alertify.error('¡Ingrese los valores de acceso nuevamente!');
        this.router.navigate(['/pago-online']);
        return;
      }

      const formsData = {
        user_identificacion: userData.documento,
        user_credencial: userData.credencial,
      };

      this.userDocument = userData.documento;

      this.svc.getCurrentInstallments(formsData).subscribe({
        next: data => {
          this.installments = data;
          this.computeSaldo();
        },
        error: err => console.error(err),
        complete: () => (this.loading = false),
      });
    });
  }

  computeSaldo() {
    this.saldoDebito = this.installments.reduce(
      (sum, it) => sum + (Number(it.valor_formato) - Number(it.pagado)),
      0
    );
  }

  openPaymentPanel(item: any) {
    this.selected = item;
    this.step = 1;
    this.selectedOption = '';
    this.selectedMethod = '';
    const offcanvas = new Offcanvas('#paymentPanel');
    offcanvas.show();
  }

  async goToPaymentMethods() {
    if (!this.selected) return;

    this.computedAmount = await this.selectedOption === 'pago_minimo'
      ? this.paymentOptions.find(opt => opt.id === 'pago_minimo')?.amount
      : this.selectedOption === 'pago_total'
        ? this.paymentOptions.find(opt => opt.id === 'pago_total')?.amount
        : this.customAmount || 0;

    const payload = {
      tipo_pago: this.selectedOption || 'pago_total',
      consecutivo_pago: this.selected?.id_credito,
      documento_yeminus: this.userDocument,
      input_pagar_total: this.computedAmount,
      otro_valor: this.customAmount,
      input_pagar_minimo: this.computedAmount,
      prefijo: this.selected.prefijo,
      tipoDocumento: this.selected.tipoDocumento,
      motivo: this.selected.motivo,
      input_mora: this.selected.total_interes,
    };

    this.svc.createPayment(payload).subscribe({
      next: async (res) => {
        if (res.success === true) {

          const existing = document.querySelector('script[src="https://checkout.epayco.co/checkout.js"]');
          if (!existing) {
            const script = this.renderer.createElement('script');
            script.src = 'https://checkout.epayco.co/checkout.js';
            script.async = true;
            this.renderer.appendChild(this.document.body, script);
          }

          const efectivo = res.efectivo;
          const containerEf = this.document.getElementById('payment-container-i-e');
          if (containerEf) {
            containerEf.innerHTML = `
              <button id="btn-efectivo" style="background:none;border:none;cursor:pointer;">
                <img src="https://ciaf.digital/public/img/pago-efectivo.webp" width="90">
              </button>
            `;
          }

          const pse = res.pse;
          const containerPse = this.document.getElementById('payment-container-i');
          if (containerPse) {
            containerPse.innerHTML = `
              <button id="btn-pse" style="background:none;border:none;cursor:pointer;">
                <img src="https://ciaf.digital/public/img/pagos-pse.webp" width="90">
              </button>
            `;
          }

          setTimeout(() => {
            const handlerEf = (window as any).ePayco.checkout.configure({
              key: '8b4e82b040c208b31bc5be3f33830392',
              test: false,
            });

            const handlerPse = (window as any).ePayco.checkout.configure({
              key: 'd4b482f39f386634f5c50ba7076eecff',
              test: false,
            });

            document.getElementById('btn-efectivo')?.addEventListener('click', () => {
              handlerEf.open({
                amount: efectivo.amount,
                name: efectivo.name,
                description: efectivo.description,
                currency: 'cop',
                country: 'CO',
                external: false,
                tax: 0,
                tax_base: efectivo.tax_base,
                extra1: efectivo.extra1,
                extra2: efectivo.extra2,
                extra3: efectivo.extra3,
                response: 'https://ciaf.edu.co/ondashboard',
                confirmation: 'https://ciaf.edu.co/ondashboard',
              });
            });

            document.getElementById('btn-pse')?.addEventListener('click', () => {
              handlerPse.open({
                amount: pse.amount,
                name: pse.name,
                description: pse.description,
                currency: 'cop',
                country: 'CO',
                external: false,
                tax: 0,
                tax_base: pse.tax_base,
                extra1: pse.extra1,
                extra2: pse.extra2,
                extra3: pse.extra3,
                response: 'https://ciaf.edu.co/ondashboard',
                confirmation: 'https://ciaf.edu.co/ondashboard',
              });
            });
          }, 800);
        } else {
          alertify.error(res.message || 'Error generando pago');
        }
      },
      error: (err) => alertify.error('Error de comunicación con el servidor')
    });

    this.step = 2;
  }
}