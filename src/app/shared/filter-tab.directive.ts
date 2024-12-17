import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[appFilterTab]',
  standalone: true
})

export class FilterTabDirective {
  @Input('appFilterTab') status: string = 'ALL'; // Status associado à tab
  @Output() filterChange = new EventEmitter<string>(); // Notifica mudanças de filtro

  constructor() {}

  // Detecta cliques no tab
  @HostListener('click')
  onClick() {
    this.filterChange.emit(this.status); // Emite o status selecionado
  }
}
