import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { combineLatest, map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-use-case',
  standalone: true,
  imports: [FormsModule, MatAutocompleteModule, ReactiveFormsModule, AsyncPipe],
  templateUrl: './use-case.component.html',
  styleUrl: './use-case.component.css'
})
export class UseCaseComponent implements OnInit {
  control = new FormControl('');
  filteredUseCases: Observable<string[]> | undefined;

  // Observable for data from the store
  allUseCase$: Observable<string[]>;

  constructor(private store: Store) {
    // Select the use cases data from the store
    this.allUseCase$ = this.store.select(selectAllJobs);
  }

  ngOnInit() {
    // Combine the valueChanges observable and the store data observable
    this.filteredUseCases = combineLatest([
      this.control.valueChanges.pipe(startWith('')),
      this.allUseCase$,
    ]).pipe(
      map(([value, useCases]) => this._filter(useCases, value || ''))
    );
  }

  private _filter(useCases: string[], value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return useCases.filter(useCase => this._normalizeValue(useCase).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

}
function selectAllJobs(state: object): string[] {
  throw new Error('Function not implemented.');
}

function startWith(arg0: string): import("rxjs").OperatorFunction<string | null, unknown> {
  throw new Error('Function not implemented.');
}

