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

          /**
           * Pago en Efectivo
           * */
          const efectivo = res.efectivo;

          const script = this.renderere.createElement('script');
          script.src = 'https://checkout.epayco.co/checkout.js';

          // Agregamos los atributos necesarios para ePayco
          script.setAttribute('data-epayco-key', '8b4e82b040c208b31bc5be3f33830392');
          script.setAttribute('data-epayco-amount', efectivo.amount.toString());
          script.setAttribute('data-epayco-tax', '0');
          script.setAttribute('data-epayco-tax-base', efectivo.tax_base);
          script.setAttribute('data-epayco-name', efectivo.name.toString());
          script.setAttribute('data-epayco-description', efectivo.description.toString());
          script.setAttribute('data-epayco-extra1', efectivo.extra1.toString());
          script.setAttribute('data-epayco-extra2', efectivo.extra2.toString());
          script.setAttribute('data-epayco-extra3', efectivo.extra3.toString());
          script.setAttribute('data-epayco-extra4', efectivo.extra4.toString());
          script.setAttribute('data-epayco-extra5', efectivo.extra5.toString());
          script.setAttribute('data-epayco-extra6', '');
          script.setAttribute('data-epayco-extra7', '');
          script.setAttribute('data-epayco-extra8', '');
          script.setAttribute('data-epayco-extra9', '');
          script.setAttribute('data-epayco-currency', 'cop');
          script.setAttribute('data-epayco-country', 'CO');
          script.setAttribute('data-epayco-test', 'true');
          script.setAttribute('data-epayco-external', 'false');
          script.setAttribute('data-epayco-response', 'https://ciaf.edu.co/ondashboard');
          script.setAttribute('data-epayco-confirmation', 'https://ciaf.edu.co/ondashboard');
          script.setAttribute('data-epayco-button', 'https://ciaf.digital/public/img/pago-efectivo.webp');

          script.className = 'epayco-button';

          const container = this.document.getElementById('payment-container-i-e');
          if (container) {
            this.renderer.appendChild(container, script);

            console.log('Script de ePayco agregado al contenedor #payment-container-i-e.');
          } else {
            console.error('No se encontró el contenedor #payment-container-i-e.');
          }

          /**
           * Pago PSE y Tarjeta
           * */
          const pse = res.pse;
          
          const scriptPse = this.renderer.createElement('script');
          scriptPse.src = 'https://checkout.epayco.co/checkout.js';

          // Agregamos los atributos necesarios para ePayco
          scriptPse.setAttribute('data-epayco-key', 'd4b482f39f386634f5c50ba7076eecff');
          scriptPse.setAttribute('data-epayco-amount', pse.amount.toString());
          scriptPse.setAttribute('data-epayco-tax', '0');
          scriptPse.setAttribute('data-epayco-tax-base', pse.tax_base.toString());
          scriptPse.setAttribute('data-epayco-name', pse.name.toString());
          scriptPse.setAttribute('data-epayco-description', pse.description.toString());
          scriptPse.setAttribute('data-epayco-extra1', pse.extra1.toString());
          scriptPse.setAttribute('data-epayco-extra2', pse.extra2.toString());
          scriptPse.setAttribute('data-epayco-extra3', pse.extra3.toString());
          scriptPse.setAttribute('data-epayco-extra4', pse.extra4.toString());
          scriptPse.setAttribute('data-epayco-extra5', pse.extra5.toString());
          scriptPse.setAttribute('data-epayco-extra6', pse.extra6.toString());
          scriptPse.setAttribute('data-epayco-extra7', pse.extra7.toString());
          scriptPse.setAttribute('data-epayco-extra8', pse.extra8.toString());
          scriptPse.setAttribute('data-epayco-extra9', pse.extra9.toString());
          scriptPse.setAttribute('data-epayco-currency', 'cop');
          scriptPse.setAttribute('data-epayco-country', 'CO');
          scriptPse.setAttribute('data-epayco-test', 'true');
          scriptPse.setAttribute('data-epayco-external', 'false');
          scriptPse.setAttribute('data-epayco-response', 'https://ciaf.edu.co/ondashboard');
          scriptPse.setAttribute('data-epayco-confirmation', 'https://ciaf.edu.co/ondashboard');
          scriptPse.setAttribute('data-epayco-button', 'https://ciaf.digital/public/img/pagos-pse.webp');

          scriptPse.className = 'epayco-button';

          const containerPse = this.document.getElementById('payment-container-i');
          if (containerPse) {
            this.renderer.appendChild(containerPse, scriptPse);
          } else {
            console.error('No se encontró el contenedor #payment-container-i.');
          }
        } else {
          alertify.error(res.message || 'Error generando pago');
        }
      },
      error: (err) => alertify.error('Error de comunicación con el servidor')
    });

    this.step = 2;
  }
}
