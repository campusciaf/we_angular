import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ConectarApiService } from '@/app/core/services/conectar-api.service';

@Component({
  selector: 'app-craia-widget',
  templateUrl: './craia-widget.component.html',
  styleUrls: ['./craia-widget.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CraiaWidgetComponent implements OnInit {

  constructor(
    private conectarApiService: ConectarApiService
  ) {}

  // 🔥 TOOLTIP
  mostrarTooltip = false;
  estadoTooltip: 'typing' | 'mensaje' = 'typing';

  // 🔥 CHAT
  abierto = true;
  mensaje = '';
  mensajes: any[] = [];
  escribiendo = false;
  sugerencias: string[] = [];

  ngOnInit() {

    this.escribirTexto('Hola 👋 soy Craia\nTe ayudo a elegir tu programa');

    // 🔥 SOLO ESTO (temporal mientras backend responde)
    this.sugerencias = [
      '🎓 Ver carreras',
      '🤔 Ayúdame a elegir',
      '💰 Cuánto cuesta estudiar',
      '📝 Quiero inscribirme'
    ];

    setTimeout(() => {
      this.mostrarTooltip = true;
      this.estadoTooltip = 'typing';
    }, 1500);

    setTimeout(() => {
      this.estadoTooltip = 'mensaje';
    }, 3500);

    setTimeout(() => {
      this.mostrarTooltip = false;
    }, 9000);
  }

  toggleChat() {
    this.abierto = !this.abierto;
  }

  // 🚀 ENVÍO PRINCIPAL
  enviar() {

    if (!this.mensaje.trim() || this.escribiendo) return;

    const texto = this.mensaje;

    // usuario
    this.mensajes.push({ tipo: 'user', texto });

    this.mensaje = '';

    // ocultar sugerencias mientras responde
    this.sugerencias = [];

    // typing fake
    this.mensajes.push({ tipo: 'bot', texto: 'Escribiendo...' });

    this.conectarApiService.enviarMensajeCraia(texto).subscribe({

    next: (res) => {

      this.mensajes.pop();

      this.escribirTexto(res.respuesta);

      this.sugerencias = res.sugerencias || [];

    },

      error: () => {

        this.mensajes.pop();

        this.escribirTexto('En este momento no puedo responderte 😊');

        this.sugerencias = [];

      }

    });
  }
  // 🔥 BOTONES
  enviarOpcion(tipo: string) {

    let texto = '';

    switch(tipo) {
      case 'oferta':
        texto = 'Quiero ver la oferta académica';
        break;

      case 'vocacion':
        texto = 'No sé qué estudiar';
        break;

      case 'costos':
        texto = 'Quiero saber los costos';
        break;

      case 'afinidad':
        texto = 'Quiero saber si una carrera es adecuada para mí';
        break;

      case 'inscripcion':
        texto = 'Quiero inscribirme';
        break;
    }

    this.mensaje = texto;
    this.enviar();
  }

  // 🔽 SCROLL
  scrollAbajo() {
    setTimeout(() => {
      const chat = document.querySelector('.craia-body');
      if (chat) {
        chat.scrollTop = chat.scrollHeight;
      }
    }, 50);
  }

  // 🔤 FORMATEO
  formatearTexto(texto: string): string {
    if (!texto) return '';
    return texto.replace(/\n/g, '<br>');
  }

  // ✨ EFECTO CHATGPT
  escribirTexto(texto: string) {

    this.escribiendo = true;

    let mensajeBot = {
      tipo: 'bot',
      texto: ''
    };

    this.mensajes.push(mensajeBot);

    let i = 0;

    const intervalo = setInterval(() => {

      mensajeBot.texto += texto.charAt(i);
      i++;

      this.scrollAbajo();

      // pausa en puntos (más humano)
      let velocidad = texto.charAt(i) === '.' ? 80 : 15;

      if (i >= texto.length) {
        clearInterval(intervalo);
        this.escribiendo = false;
      }

    }, 15);
  }

  clickSugerencia(texto: string) {
    this.mensaje = texto;
    this.enviar();
  }



  

}