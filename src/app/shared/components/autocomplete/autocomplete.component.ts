import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-autocomplete',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.css'
})
export class AutocompleteComponent {
  @Input() suggestions: string[] = [];
  @Input() placeholder: string = 'Type to search...';
  @Output() selected: EventEmitter<string> = new EventEmitter<string>();

  query: string = '';
  filteredSuggestions: string[] = [];
  isFocused: boolean = false;
  private querySubject = new Subject<string>();

  constructor() {
    this.querySubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((query) => this.filterSuggestions(query))
      )
      .subscribe((suggestions) => (this.filteredSuggestions = suggestions));
  }

  onInput(event: any): void {
    this.querySubject.next(this.query);
  }

  filterSuggestions(query: string): Observable<string[]> {
    return new Observable<string[]>((observer) => {
      const filtered = this.suggestions.filter((item) =>
        item.toLowerCase().includes(query.toLowerCase())
      );
      observer.next(filtered);
      observer.complete();
    });
  }

  selectSuggestion(suggestion: string): void {
    this.query = suggestion;
    this.filteredSuggestions = [];
    this.selected.emit(suggestion);
    this.isFocused = false;
  }

  onFocus(): void {
    this.isFocused = true;
  }

  onBlur(): void {
    setTimeout(() => {
      this.isFocused = false;
    }, 200); // Atraso para permitir que o clique na sugestão seja registrado antes do blur
  }
}
