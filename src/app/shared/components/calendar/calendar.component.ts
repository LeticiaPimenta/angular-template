import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-search-filters',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './search-filters.component.html',
  styleUrls: ['./search-filters.component.css']
})
export class SearchFiltersComponent {
  // Grupo de formulário para os filtros
  searchForm = new FormGroup({
    id: new FormControl(''),
    groupId: new FormControl(''),
    name: new FormControl(''),
    audioDate: new FormControl<Date | null>(null),
    format: new FormControl(''),
    range: new FormControl('') // Para o campo de data dupla
  });

  onSearch() {
    console.log('Valores do filtro:', this.searchForm.value);
  }

  onReset() {
    this.searchForm.reset();
  }
}