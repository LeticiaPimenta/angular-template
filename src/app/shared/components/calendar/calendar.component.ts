import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-filter-range',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule
  ],
  templateUrl: './filter-range.component.html',
  styleUrls: ['./filter-range.component.css']
})
export class FilterRangeComponent {
  // Definimos o formulário com o range de datas
  searchForm = new FormGroup({
    startDate: new FormControl<Date | null>(null),
    endDate: new FormControl<Date | null>(null),
    // outros campos...
  });

  onSearch() {
    const { startDate, endDate } = this.searchForm.value;
    console.log('Período selecionado:', startDate, 'até', endDate);
  }
}
