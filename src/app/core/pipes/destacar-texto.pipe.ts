import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({ name: 'destacarTexto' })
export class DestacarTextoPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: any): SafeHtml {
    if (value === null || value === undefined) return '';
    
    let strValue = '';
    if (typeof value === 'string') {
      strValue = value;
    } else if (typeof value.toString === 'function') {
      strValue = value.toString();
    } else {
      return value;
    }

    // Reemplaza [[texto]] por <span class="ciaf-gradient-text ciaf-gradient-text--brand">texto</span>
    const formatted = strValue.replace(/\[\[(.*?)\]\]/g, '<span class="ciaf-gradient-text ciaf-gradient-text--brand">$1</span>');
    return this.sanitizer.bypassSecurityTrustHtml(formatted);
  }
}
