import { Component } from '@angular/core';

interface FooterLink {
  label: string;
  href?: string;
  routerLink?: string;
  external?: boolean;
}

interface RedSocial {
  nombre: string;
  href: string;
  icono: string;
}

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  logo = 'assets/image/logo-negro.webp';
  vigilada = 'assets/image/vigilada-2.webp';
  correociaf = 'contacto@ciaf.edu.co';

  redes: RedSocial[] = [
    { nombre: 'Facebook', href: 'https://www.facebook.com/ComunidadCIAF', icono: 'fa-facebook-f' },
    { nombre: 'Instagram', href: 'https://www.instagram.com/comunidadciaf/', icono: 'fa-instagram' },
    { nombre: 'YouTube', href: 'https://www.youtube.com/channel/UCf6j5NaZbDKkdNpAtzbs9zA', icono: 'fa-youtube' },
    { nombre: 'TikTok', href: 'https://www.tiktok.com/@comunidadciaf?lang=es', icono: 'fa-tiktok' },
    { nombre: 'LinkedIn', href: 'https://www.linkedin.com/school/ciaf/', icono: 'fa-linkedin-in' }
  ];

  linksAcademico: FooterLink[] = [
    { label: 'Carreras Universitarias', routerLink: '/inicio' },
    { label: 'Técnicas Laborales', routerLink: '/inicio' },
    { label: 'Educación Continuada', routerLink: '/continuada' },
    { label: 'Investigaciones', routerLink: '/investigaciones' }
  ];

  linksInstitucion: FooterLink[] = [
    { label: 'Nuestra Institución', routerLink: '/conocenos' },
    { label: 'Bienestar', routerLink: '/bienestar' },
    { label: 'Egresados', routerLink: '/egresados' },
    { label: 'CIAF Virtual', href: 'https://virtual.ciaf.edu.co', external: true },
    { label: 'Blog', routerLink: '/blog' }
  ];

  anioActual = new Date().getFullYear();

  linksLegales: FooterLink[] = [
    {
      label: 'PEI',
      href: 'https://ciaf.digital/public/web_normativa/PEI-CIAF-Educacion-Superior.pdf',
      external: true
    },
    {
      label: 'Reglamento Estudiantil',
      href: 'https://ciaf.digital/public/web_reglamentos/reglamentoestudiantil.pdf',
      external: true
    },
    { label: 'Política de Datos', routerLink: '/tratamientodatos' },
    { label: 'Vigilada Mineducación', routerLink: '/conocenos' }
  ];
}
