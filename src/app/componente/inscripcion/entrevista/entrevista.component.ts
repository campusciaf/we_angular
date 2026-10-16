import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConectarApiService } from '@/app/core/services/conectar-api.service';

type VistaEntrevista = 'cargando' | 'error' | 'bienvenida' | 'preguntas' | 'agradecimiento';
type TipoPregunta = 'multiple' | 'unica' | 'texto' | 'area';

interface CampoTexto {
  id: string;
  etiqueta: string;
  placeholder: string;
  tipo: 'text' | 'tel' | 'email';
  opcional?: boolean;
  ancho?: 'completo';
}

interface GrupoOpciones {
  id: string;
  leyenda: string;
  opciones: string[];
}

interface PreguntaEntrevista {
  id: string;
  numero: number;
  texto: string;
  ayuda?: string;
  tipo: TipoPregunta;
  opciones?: string[];
  columnas?: 2;
  max?: number;
  placeholder?: string;
  campos?: CampoTexto[];
  grupos?: GrupoOpciones[];
}

interface SeccionEntrevista {
  badge: string;
  titulo: string;
  lead?: string;
  avisoTitulo?: string;
  aviso?: string;
  puente?: string;
  cierre?: string;
  preguntas: PreguntaEntrevista[];
}

@Component({
  selector: 'app-entrevista',
  templateUrl: './entrevista.component.html',
  styleUrls: ['./entrevista.component.css'],
})
export class EntrevistaComponent implements OnInit {
  vista: VistaEntrevista = 'cargando';
  autorizaTratamiento = false;
  idEstudiante: string | number | null = null;
  logo = 'assets/image/logo-azul.webp';
  intentoEnviar = false;
  formularioListo = false;
  enviando = false;
  guardada = false;
  errorEnvio = '';
  unicas: { [id: string]: string } = {};
  multiples: { [id: string]: string[] } = {};
  textos: { [id: string]: string } = {};
  avisoTope: { [id: string]: boolean } = {};
  private consulta = 0;

  readonly secciones: SeccionEntrevista[] = [
    {
      badge: 'Tus sueños comienzan aquí',
      titulo: 'Tus sueños comienzan aquí',
      lead: 'Toda historia tiene un comienzo y queremos conocer el tuyo.',
      preguntas: [
        {
          id: 'motivacion_programa',
          numero: 1,
          texto: '¿Qué fue lo que más te motivó a iniciar este programa académico?',
          ayuda: 'Puedes seleccionar varias opciones.',
          tipo: 'multiple',
          columnas: 2,
          opciones: [
            'Cumplir un sueño personal.',
            'Crecer profesionalmente.',
            'Conseguir mejores oportunidades laborales.',
            'Mejorar mis ingresos.',
            'Crear mi empresa o fortalecer un emprendimiento.',
            'Continuar mi proyecto de vida.',
            'Fue una recomendación de otra persona.',
            'Aún estoy descubriendo cuál es el camino que quiero seguir.',
            'Otro.',
          ],
        },
        {
          id: 'influencia_ciaf',
          numero: 2,
          texto: '¿Qué fue lo que más influyó en tu decisión de estudiar en CIAF?',
          ayuda: 'Puedes seleccionar varias opciones.',
          tipo: 'multiple',
          columnas: 2,
          opciones: [
            'El programa académico.',
            'La calidad de la institución.',
            'Los horarios.',
            'La ubicación.',
            'Las opciones de financiación.',
            'La recomendación de familiares o amigos.',
            'El costo.',
            'Posicionamiento en la región.',
            'Formación por ciclos.',
            'Otro.',
          ],
        },
        {
          id: 'seguridad_carrera_elegida',
          numero: 3,
          texto: '¿Qué tan seguro(a) te sientes de la carrera que elegiste?',
          tipo: 'unica',
          opciones: [
            'Muy seguro(a).',
            'Seguro(a).',
            'Tengo algunas dudas.',
            'Aún no estoy completamente convencido(a).',
          ],
        },
        {
          id: 'conocimiento_profesion',
          numero: 4,
          texto: 'Antes de matricularte, ¿qué tanto conocías sobre esta profesión?',
          tipo: 'unica',
          opciones: ['Mucho.', 'Bastante.', 'Poco.', 'Muy poco.'],
        },
        {
          id: 'claridad_proyecto_vida',
          numero: 5,
          texto:
            'Cuando piensas en tu futuro, ¿qué tan claro tienes el proyecto de vida que deseas construir?',
          tipo: 'unica',
          opciones: [
            'Muy claro.',
            'Bastante claro.',
            'Tengo algunas ideas.',
            'Aún no lo tengo definido.',
          ],
        },
      ],
    },
    {
      badge: '💙 Inspiradores',
      titulo: 'Inspiradores',
      puente: 'Los sueños crecen cuando se comparten.',
      lead: 'Tu red de apoyo también hace parte de este sueño. Los sueños crecen cuando se comparten. Inspiradores vincula a las personas más importantes de tu entorno familiar, personal o laboral para convertirlas en una red de apoyo que te motive, te impulse y celebre contigo cada logro hasta el día de tu graduación. Porque en CIAF no solo formamos profesionales; construimos comunidades que inspiran, acompañan y transforman vidas.',
      preguntas: [
        {
          id: 'apoyo_personas',
          numero: 6,
          texto:
            '¿Sientes que cuentas con el apoyo de las personas más importantes para cumplir esta meta?',
          tipo: 'unica',
          opciones: [
            'Sí, completamente.',
            'En gran parte.',
            'Solo algunas personas.',
            'Siento que estoy afrontando este proceso solo(a).',
          ],
        },
        {
          id: 'inspirador_relacion',
          numero: 7,
          texto: '¿Quién será tu Inspirador CIAF durante esta nueva etapa?',
          tipo: 'unica',
          columnas: 2,
          opciones: [
            'Madre',
            'Padre',
            'Pareja',
            'Hijo(a)',
            'Hermano(a)',
            'Otro familiar',
            'Amigo(a)',
            'Compañero(a) de trabajo',
            'Jefe',
            'Otra persona',
          ],
          campos: [
            {
              id: 'inspirador_nombre',
              etiqueta: 'Nombre',
              placeholder: 'Nombre completo',
              tipo: 'text',
            },
            {
              id: 'inspirador_celular',
              etiqueta: 'Celular',
              placeholder: 'Número de contacto',
              tipo: 'tel',
            },
            {
              id: 'inspirador_correo',
              etiqueta: 'Correo electrónico (opcional)',
              placeholder: 'correo@ejemplo.com',
              tipo: 'email',
              opcional: true,
              ancho: 'completo',
            },
          ],
        },
        {
          id: 'inspirador_comunicaciones',
          numero: 8,
          texto:
            '¿Te gustaría que tu Inspirador también haga parte de algunas actividades y comunicaciones de tu experiencia en CIAF?',
          tipo: 'unica',
          columnas: 2,
          opciones: ['Sí.', 'No.'],
        },
      ],
    },
    {
      badge: '🤝 Queremos caminar contigo',
      titulo: 'Queremos caminar contigo',
      puente: 'La institución también es un lugar para aprender a pedir ayuda.',
      lead: 'La institución también es un lugar para aprender a pedir ayuda. Queremos que sepas que no estarás solo(a).',
      avisoTitulo: 'Información confidencial',
      aviso:
        'Comparte únicamente aquello con lo que te sientas cómodo o cómoda. Esta información solo será consultada por el equipo autorizado de Bienestar Institucional, según la Ley 1581 de 2012.',
      preguntas: [
        {
          id: 'situacion_acompanamiento',
          numero: 9,
          texto:
            '¿Hay alguna situación personal, familiar, emocional o de salud que consideres importante que conozcamos para acompañarte mejor?',
          tipo: 'unica',
          opciones: [
            'No.',
            'Sí, me gustaría recibir orientación.',
            'Sí, actualmente recibo atención médica o psicológica.',
          ],
        },
        {
          id: 'contacto_equipo',
          numero: 10,
          texto:
            'Si en algún momento identificamos que podemos ayudarte, ¿te gustaría que nuestro equipo se comunicara contigo?',
          tipo: 'unica',
          opciones: ['Sí.', 'Tal vez.', 'Por ahora no.'],
        },
        {
          id: 'forma_pedir_ayuda',
          numero: 11,
          texto: 'Cuando enfrentas una dificultad importante, normalmente…',
          tipo: 'unica',
          opciones: [
            'Busco ayuda rápidamente.',
            'Primero intento resolverla y luego pido ayuda.',
            'Solo busco ayuda cuando ya no encuentro otra solución.',
            'Prefiero resolverla por mi cuenta.',
          ],
        },
      ],
    },
    {
      badge: '📚 Queremos impulsar tu aprendizaje',
      titulo: 'Queremos impulsar tu aprendizaje',
      puente: 'Cada estudiante llega con fortalezas propias.',
      lead: 'Cada estudiante llega con fortalezas y también con aspectos que desea fortalecer. Queremos conocerlos para apoyarte desde el primer semestre.',
      preguntas: [
        {
          id: 'acompanamiento_academico',
          numero: 12,
          texto:
            '¿En qué asignaturas o habilidades crees que podrías necesitar un acompañamiento adicional?',
          ayuda: '(Puedes seleccionar varias opciones).',
          tipo: 'multiple',
          columnas: 2,
          opciones: [
            'Matemáticas.',
            'Inglés.',
            'Lectura y comprensión de textos.',
            'Escritura y redacción.',
            'Herramientas digitales.',
            'Métodos de estudio.',
            'Organización del tiempo.',
            'Hablar en público.',
            'Habilidades blandas.',
            'Ninguna por el momento.',
            'Otras.',
          ],
        },
        {
          id: 'fortalezas_principales',
          numero: 13,
          texto: '¿Cuáles consideras que son tus principales fortalezas?',
          ayuda: '(Selecciona máximo tres opciones).',
          tipo: 'multiple',
          columnas: 2,
          max: 3,
          opciones: [
            'Liderazgo.',
            'Trabajo en equipo.',
            'Comunicación.',
            'Creatividad.',
            'Organización.',
            'Pensamiento lógico.',
            'Tecnología.',
            'Emprendimiento.',
            'Disciplina.',
            'Adaptabilidad.',
            'Otra.',
          ],
        },
      ],
    },
    {
      badge: '🚀 Cuéntanos sobre tu realidad',
      titulo: 'Cuéntanos sobre tu realidad',
      puente: 'Cada historia es diferente y la tuya nos importa.',
      lead: 'Cada historia es diferente y conocer la tuya nos ayudará a brindarte un mejor acompañamiento.',
      preguntas: [
        {
          id: 'situacion_actual',
          numero: 14,
          texto: 'Actualmente…',
          tipo: 'unica',
          opciones: [
            'Solo estudio.',
            'Estudio y trabajo medio tiempo.',
            'Estudio y trabajo tiempo completo.',
            'Tengo un emprendimiento.',
            'Trabajo y además tengo un emprendimiento.',
          ],
        },
        {
          id: 'financiacion_estudios',
          numero: 15,
          texto: '¿Cómo financiarás principalmente tus estudios?',
          tipo: 'unica',
          opciones: [
            'Recursos propios.',
            'Apoyo de mi familia.',
            'Crédito educativo.',
            'Beca o subsidio.',
            'Varias opciones.',
            'Otro.',
          ],
        },
        {
          id: 'ingreso_hogar',
          numero: 16,
          texto: '¿Cuál es el ingreso mensual aproximado de tu hogar?',
          ayuda:
            'Esta información es confidencial y únicamente será utilizada para identificar oportunidades de apoyo.',
          tipo: 'unica',
          opciones: [
            'Menos de $1.000.000',
            'Entre $1.000.001 y $2.000.000',
            'Entre $2.000.001 y $3.000.000',
            'Entre $3.000.001 y $5.000.000',
            'Entre $5.000.001 y $8.000.000',
            'Más de $8.000.000',
            'No lo conozco.',
            'Prefiero no responder.',
          ],
        },
        {
          id: 'dependientes_economicos',
          numero: 17,
          texto: '¿Tienes personas que dependan económicamente de ti?',
          tipo: 'unica',
          columnas: 2,
          opciones: ['No.', 'Sí, una.', 'Sí, dos.', 'Sí, tres o más.'],
        },
        {
          id: 'mayor_reto',
          numero: 18,
          texto: '¿Cuál crees que será el mayor reto para continuar estudiando?',
          tipo: 'unica',
          opciones: [
            'La situación económica.',
            'El trabajo.',
            'La organización del tiempo.',
            'Las responsabilidades familiares.',
            'La salud.',
            'Adaptarme a la vida institucional.',
            'Mantener la motivación.',
            'Otro.',
          ],
        },
      ],
    },
    {
      badge: '💻 Todo listo para aprender',
      titulo: 'Todo listo para aprender',
      puente: 'Queremos que tengas todo lo necesario para aprender.',
      lead: 'Queremos asegurarnos de que tengas las herramientas necesarias para vivir una buena experiencia académica.',
      preguntas: [
        {
          id: 'recursos_academicos',
          numero: 19,
          texto:
            '¿Con cuáles de estos recursos cuentas para desarrollar tus actividades académicas?',
          tipo: 'unica',
          grupos: [
            {
              id: 'recurso_computador',
              leyenda: 'Computador',
              opciones: [
                'Propio.',
                'Compartido.',
                'Solo celular o tableta.',
                'No cuento con computador.',
              ],
            },
            {
              id: 'recurso_internet',
              leyenda: 'Internet',
              opciones: [
                'Estable.',
                'Algunas veces presenta dificultades.',
                'No tengo acceso.',
              ],
            },
          ],
        },
      ],
    },
    {
      badge: '🏠 Conozcamos un poco más de ti',
      titulo: 'Conozcamos un poco más de ti',
      puente: 'Un poco más sobre tu día a día.',
      preguntas: [
        {
          id: 'municipio_actual',
          numero: 20,
          texto: '¿En qué municipio resides actualmente?',
          tipo: 'texto',
          placeholder: 'Escribe tu municipio',
        },
        {
          id: 'estrato_socioeconomico',
          numero: 21,
          texto: '¿Cuál es tu estrato socioeconómico?',
          tipo: 'unica',
          opciones: ['1', '2', '3', '4', '5', '6'],
        },
        {
          id: 'con_quien_vive',
          numero: 22,
          texto: '¿Con quién vives actualmente?',
          tipo: 'unica',
          columnas: 2,
          opciones: [
            'Con mis padres.',
            'Solo con mi madre.',
            'Solo con mi padre.',
            'Con mi pareja.',
            'Con mis hijos.',
            'Con otros familiares.',
            'Con amigos.',
            'Vivo solo(a).',
            'Otro.',
          ],
        },
      ],
    },
    {
      badge: 'Vive la experiencia CIAF',
      titulo: 'Vive la experiencia CIAF',
      puente: 'La institución también es descubrir nuevos talentos.',
      lead: 'Queremos que la institución también sea un espacio para crecer, descubrir talentos y disfrutar nuevas experiencias.',
      cierre: '“Comparte únicamente aquello con lo que te sientas cómodo o cómoda”.',
      preguntas: [
        {
          id: 'temas_acompanamiento',
          numero: 23,
          texto:
            'Además de tu formación académica, ¿en cuáles de estos temas te gustaría que CIAF te acompañara?',
          ayuda: '(Puedes seleccionar varias opciones).',
          tipo: 'multiple',
          columnas: 2,
          opciones: [
            'Bienestar emocional.',
            'Empleabilidad.',
            'Emprendimiento.',
            'Liderazgo.',
            'Educación financiera.',
            'Deportes.',
            'Cultura.',
            'Idiomas.',
            'Investigación.',
            'Innovación.',
            'Voluntariado.',
            'Otro.',
          ],
        },
      ],
    },
    {
      badge: 'Antes de comenzar…',
      titulo: 'Antes de comenzar…',
      puente: 'Solo queda algo más. Gracias por tu tiempo hasta aquí.',
      preguntas: [
        {
          id: 'mensaje_final',
          numero: 24,
          texto:
            '¿Hay algo que quisieras contarnos para que podamos acompañarte mejor durante esta nueva etapa?',
          ayuda: 'Escribe libremente. Este campo es opcional.',
          tipo: 'area',
          placeholder: 'Escribe con tranquilidad…',
        },
      ],
    },
  ];

  constructor(
    private conectarApiService: ConectarApiService,
    private router: Router,
  ) {
    this.prepararRespuestas();
  }

  ngOnInit(): void {
    this.cargarAspirante();
  }

  cargarAspirante(): void {
    const idnum = localStorage.getItem('idnum');
    const token = localStorage.getItem('token');
    const solicitud = ++this.consulta;
    this.vista = 'cargando';

    if (!idnum || !token) {
      this.vista = 'error';
      return;
    }

    this.conectarApiService.onInteresados(idnum, token, 0).subscribe({
      next: (data) => {
        if (solicitud !== this.consulta) {
          return;
        }

        if (!Array.isArray(data) || data.length !== 1) {
          this.vista = 'error';
          return;
        }

        this.idEstudiante = data[0]['id_estudiante'];
        const estado = data[0]['entrevista'];
        if (estado === 1 || estado === '1') {
          this.vista = 'bienvenida';
          return;
        }

        this.router.navigate(['/ondashboard']);
      },
      error: () => {
        if (solicitud !== this.consulta) {
          return;
        }
        this.vista = 'error';
      },
    });
  }

  volver(): void {
    this.consulta++;
    this.router.navigate(['/ondashboard']);
  }

  comenzar(): void {
    if (!this.autorizaTratamiento) {
      return;
    }
    this.intentoEnviar = false;
    this.formularioListo = false;
    this.enviando = false;
    this.guardada = false;
    this.errorEnvio = '';
    this.vista = 'preguntas';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  regresarBienvenida(): void {
    this.vista = 'bienvenida';
  }

  get porcentaje(): number {
    const requeridas = this.preguntasPlanas.filter((pregunta) => pregunta.tipo !== 'area');
    if (!requeridas.length) {
      return 0;
    }
    const completas = requeridas.filter((pregunta) => this.esValida(pregunta)).length;
    return Math.round((completas / requeridas.length) * 100);
  }

  get formularioValido(): boolean {
    return this.preguntasPlanas.every((pregunta) => this.esValida(pregunta));
  }

  estaSeleccionada(id: string, opcion: string, tipo: TipoPregunta): boolean {
    if (tipo === 'multiple') {
      return (this.multiples[id] || []).includes(opcion);
    }
    return this.unicas[id] === opcion;
  }

  elegir(pregunta: PreguntaEntrevista, opcion: string): void {
    this.formularioListo = false;
    if (pregunta.tipo === 'multiple') {
      const actual = [...(this.multiples[pregunta.id] || [])];
      const indice = actual.indexOf(opcion);
      if (indice >= 0) {
        actual.splice(indice, 1);
        this.avisoTope[pregunta.id] = false;
      } else if (pregunta.max && actual.length >= pregunta.max) {
        this.avisoTope[pregunta.id] = true;
        return;
      } else {
        actual.push(opcion);
        this.avisoTope[pregunta.id] = false;
      }
      this.multiples[pregunta.id] = actual;
      return;
    }
    this.unicas[pregunta.id] = opcion;
  }

  elegirUnica(id: string, opcion: string): void {
    this.formularioListo = false;
    this.unicas[id] = opcion;
  }

  escribir(id: string, evento: Event): void {
    const campo = evento.target as HTMLInputElement | HTMLTextAreaElement | null;
    this.textos[id] = campo ? campo.value : '';
    this.formularioListo = false;
  }

  mostrarError(pregunta: PreguntaEntrevista): boolean {
    return this.intentoEnviar && !this.esValida(pregunta);
  }

  mensajeError(pregunta: PreguntaEntrevista): string {
    if (pregunta.grupos) {
      return 'Selecciona una opción de computador y una de internet.';
    }
    if (pregunta.campos) {
      if (!this.unicas[pregunta.id]) {
        return 'Selecciona la relación y completa los datos de tu Inspirador.';
      }
      if (!this.correoValido('inspirador_correo')) {
        return 'Escribe un correo válido o déjalo vacío.';
      }
      if (!this.celularValido('inspirador_celular')) {
        return 'Escribe un celular de 10 dígitos.';
      }
      return 'Completa el nombre y el celular de tu Inspirador.';
    }
    if (pregunta.tipo === 'multiple') {
      return pregunta.max
        ? 'Selecciona entre una y tres opciones.'
        : 'Selecciona al menos una opción.';
    }
    if (pregunta.tipo === 'texto') {
      return 'Escribe tu municipio.';
    }
    return 'Selecciona una opción.';
  }

  finalizar(): void {
    if (this.enviando || this.guardada) {
      return;
    }

    this.intentoEnviar = true;
    this.formularioListo = false;
    this.errorEnvio = '';
    if (!this.autorizaTratamiento || !this.formularioValido) {
      const primera = this.preguntasPlanas.find((pregunta) => !this.esValida(pregunta));
      if (primera) {
        document
          .getElementById('pregunta-' + primera.id)
          ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    const idnum = localStorage.getItem('idnum');
    const token = localStorage.getItem('token');
    if (!idnum || !token) {
      this.errorEnvio = 'No se encontró la sesión. Vuelve a ingresar e intenta de nuevo.';
      return;
    }

    this.enviando = true;
    this.conectarApiService.insertarEntrevista(this.armarEnvio(idnum, token)).subscribe({
      next: (respuesta) => {
        this.enviando = false;
        if (
          respuesta &&
          respuesta.status === 'ok' &&
          (respuesta.resultado === 'guardada' || respuesta.resultado === 'ya_completada')
        ) {
          this.guardada = true;
          this.vista = 'agradecimiento';
          window.scrollTo(0, 0);
          return;
        }
        this.errorEnvio = 'No se pudo confirmar el guardado. Inténtalo de nuevo.';
      },
      error: (err) => {
        this.enviando = false;
        const mensaje = err?.error?.result?.error_msg;
        this.errorEnvio =
          typeof mensaje === 'string' && mensaje
            ? mensaje
            : 'No se pudo enviar la entrevista. Inténtalo de nuevo.';
      },
    });
  }

  private armarEnvio(idnum: string, token: string): { [clave: string]: unknown } {
    return {
      opcion: 4,
      version_formulario: 2,
      idnum,
      token,
      consentimiento_datos: 1,
      motivacion_programa: this.multiples['motivacion_programa'],
      influencia_ciaf: this.multiples['influencia_ciaf'],
      seguridad_carrera_elegida: this.unicas['seguridad_carrera_elegida'],
      conocimiento_profesion: this.unicas['conocimiento_profesion'],
      claridad_proyecto_vida: this.unicas['claridad_proyecto_vida'],
      apoyo_personas: this.unicas['apoyo_personas'],
      inspirador_relacion: this.unicas['inspirador_relacion'],
      inspirador_nombre: (this.textos['inspirador_nombre'] || '').trim(),
      inspirador_celular: (this.textos['inspirador_celular'] || '').replace(/\s/g, ''),
      inspirador_correo: (this.textos['inspirador_correo'] || '').trim(),
      inspirador_comunicaciones: this.unicas['inspirador_comunicaciones'],
      situacion_acompanamiento: this.unicas['situacion_acompanamiento'],
      contacto_equipo: this.unicas['contacto_equipo'],
      forma_pedir_ayuda: this.unicas['forma_pedir_ayuda'],
      acompanamiento_academico: this.multiples['acompanamiento_academico'],
      fortalezas_principales: this.multiples['fortalezas_principales'],
      situacion_actual: this.unicas['situacion_actual'],
      financiacion_estudios: this.unicas['financiacion_estudios'],
      ingreso_hogar: this.unicas['ingreso_hogar'],
      dependientes_economicos: this.unicas['dependientes_economicos'],
      mayor_reto: this.unicas['mayor_reto'],
      recurso_computador: this.unicas['recurso_computador'],
      recurso_internet: this.unicas['recurso_internet'],
      municipio_actual: (this.textos['municipio_actual'] || '').trim(),
      estrato_socioeconomico: this.unicas['estrato_socioeconomico'],
      con_quien_vive: this.unicas['con_quien_vive'],
      temas_acompanamiento: this.multiples['temas_acompanamiento'],
      mensaje_final: (this.textos['mensaje_final'] || '').trim(),
    };
  }

  private get preguntasPlanas(): PreguntaEntrevista[] {
    return this.secciones.reduce(
      (lista: PreguntaEntrevista[], seccion) => lista.concat(seccion.preguntas),
      [],
    );
  }

  private prepararRespuestas(): void {
    this.preguntasPlanas.forEach((pregunta) => {
      if (pregunta.tipo === 'multiple') {
        this.multiples[pregunta.id] = [];
      }
      if (pregunta.tipo === 'unica') {
        this.unicas[pregunta.id] = '';
      }
      if (pregunta.tipo === 'texto' || pregunta.tipo === 'area') {
        this.textos[pregunta.id] = '';
      }
      pregunta.campos?.forEach((campo) => {
        this.textos[campo.id] = '';
      });
      pregunta.grupos?.forEach((grupo) => {
        this.unicas[grupo.id] = '';
      });
    });
  }

  private esValida(pregunta: PreguntaEntrevista): boolean {
    if (pregunta.tipo === 'area') {
      return true;
    }
    if (pregunta.tipo === 'multiple') {
      const cantidad = (this.multiples[pregunta.id] || []).length;
      return cantidad >= 1 && (!pregunta.max || cantidad <= pregunta.max);
    }
    if (pregunta.tipo === 'texto') {
      return (this.textos[pregunta.id] || '').trim().length > 0;
    }
    if (pregunta.grupos) {
      return pregunta.grupos.every((grupo) => !!this.unicas[grupo.id]);
    }
    if (!this.unicas[pregunta.id]) {
      return false;
    }
    if (!pregunta.campos) {
      return true;
    }
    return pregunta.campos.every((campo) => {
      const valor = (this.textos[campo.id] || '').trim();
      if (campo.opcional && !valor) {
        return true;
      }
      if (campo.tipo === 'email') {
        return this.correoValido(campo.id);
      }
      if (campo.tipo === 'tel') {
        return this.celularValido(campo.id);
      }
      return valor.length > 0;
    });
  }

  private celularValido(id: string): boolean {
    return /^\d{10}$/.test((this.textos[id] || '').replace(/\s/g, ''));
  }

  private correoValido(id: string): boolean {
    const valor = (this.textos[id] || '').trim();
    if (!valor) {
      return true;
    }
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
  }
}
