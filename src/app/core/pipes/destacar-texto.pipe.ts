import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({ name: 'destacarTexto' })
export class DestacarTextoPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string | null | undefined): SafeHtml {
    if (!value) return '';
    // Reemplaza [[texto]] por <span class="ciaf-gradient-text ciaf-gradient-text--brand">texto</span>
    const formatted = value.replace(/\[\[(.*?)\]\]/g, '<span class="ciaf-gradient-text ciaf-gradient-text--brand">$1</span>');
    return this.sanitizer.bypassSecurityTrustHtml(formatted);
  }
}
