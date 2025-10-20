import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Offcanvas } from 'bootstrap';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserState } from '@/app/state/user.reducer';
import { Installment } from '@/app/clases/payment';
import { PayService } from '@/app/core/services/pay.service';

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
    private sanitizer: DomSanitizer,
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

    var data = {
      //Parametros compra (obligatorio)
      name: "Vestido Mujer Primavera",
      description: "Vestido Mujer Primavera",
      invoice: "FAC-1234",
      currency: "cop",
      amount: "5000",
      tax_base: "4000",
      tax: "500",
      tax_ico: "500",
      country: "co",
      lang: "en",

      //Onpage="false" - Standard="true"
      external: "true",

      //Atributos opcionales
      extra1: "extra1",
      extra2: "extra2",
      extra3: "extra3",
      confirmation: "http://secure2.payco.co/prueba_curl.php",
      response: "http://secure2.payco.co/prueba_curl.php",

      //Atributos cliente
      name_billing: "Jhon Doe",
      address_billing: "Carrera 19 numero 14 91",
      type_doc_billing: "cc",
      mobilephone_billing: "3050000000",
      number_doc_billing: "100000000",
      email_billing: "jhondoe@epayco.com",

      //atributo deshabilitación método de pago
      methodsDisable: ["TDC", "PSE","SP","CASH","DP"]
    };
      
    const payload = {
      tipo_pago: this.selectedOption || 'pago_total',
      consecutivo_pago: this.selected?.id_credito,
      documento_yeminus: this.userDocument,
      input_pagar_total: this.computedAmount,
      otro_valor: this.customAmount,
      input_pagar_minimo: this.computedAmount,
      prefijo: 'CI',
      tipoDocumento: 'CC',
      motivo: this.selected.motivo,
      input_mora: this.selected.total_interes,
    };

    this.svc.createPayment(payload).subscribe({
      next: async (res) => {
        if (res.success === true) {
         await this.setPaymentHtml(res.html);
         this.ejecutarScripts();
        } else {
          alertify.error(res.message || 'Error generando pago');
        }
      },
      error: (err) => alertify.error('Error de comunicación con el servidor')
    });

    this.step = 2;
  }

  paymentFormHtml: SafeHtml | null = null;

  setPaymentHtml(html: string) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;

    const forms = Array.from(tempDiv.querySelectorAll('form'));
    const scripts = Array.from(tempDiv.querySelectorAll('script'));

    const combinedHtml = forms.map(f => f.outerHTML).join('');

    this.paymentFormHtml = this.sanitizer.bypassSecurityTrustHtml(combinedHtml);

    document.querySelectorAll('script[src*="checkout.epayco.co"]').forEach(s => s.remove());

    setTimeout(() => {
      scripts.forEach(script => {
        const newScript = document.createElement('script');
        Array.from(script.attributes).forEach(attr => {
          newScript.setAttribute(attr.name, attr.value);
        });
        document.body.appendChild(newScript);
      });
    }, 300);
  }


  confirmPayment() {
    console.log('Pago confirmado con método:', this.selectedMethod);
    alertify.success(`Pago de ${this.computedAmount} con ${this.selectedMethod}`);
  }

  ejecutarScripts() {
    const script = document.createElement('script');

    script.src = 'https://checkout.epayco.co/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  }
}
