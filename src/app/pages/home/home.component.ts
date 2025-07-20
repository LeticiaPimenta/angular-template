import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { FilterTabDirective } from '../../shared/filter-tab.directive';
import { Item } from '../../shared/models/item.model';
import { createFeature, createFeatureSelector, createReducer, createSelector } from '@ngrx/store';
import { UseCaseComponent } from '../use-case/use-case.component';
import { initialState } from '../../state/reducers/auth.reducer';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatTabsModule, FilterTabDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})


export class HomeComponent {
  allItems$: Observable<Item[]>;
  filteredItems$: Observable<Item[]>;
  private filterSubject = new BehaviorSubject<string>('ALL');
  dataSource = new MatTableDataSource<Item>(); // Data source compatível
  displayedColumns: string[] = ['id', 'name', 'status'];

  constructor() {
    this.allItems$ = of([
      { id: 1, name: 'Task 1', status: 'COMPLETED' },
      { id: 2, name: 'Task 2', status: 'RUNNING' },
      { id: 3, name: 'Task 3', status: 'FAILED' },
      { id: 4, name: 'Task 4', status: 'PENDING' },
      { id: 5, name: 'Task 5', status: 'COMPLETED' },
    ]);

    this.filteredItems$ = this.filterSubject.pipe(
      switchMap((filter) =>
        filter === 'ALL'
          ? this.allItems$
          : this.allItems$.pipe(
              map((items) => items.filter((item) => item.status === filter))
            )
      )
    );

    if (this.filteredItems$) {
      this.filteredItems$.subscribe((items) => {
        this.dataSource.data = items || [];
      });
    }
  }
  setFilter(status: string) {
    this.filterSubject.next(status);
  }

  testeEvento(status: string){
    console.log(status, "teste")
  }

  onTabChange(index: number) {
    const filters = ['ALL', 'COMPLETED', 'RUNNING', 'FAILED', 'PENDING'];
    const selectedFilter = filters[index];
    this.setFilter(selectedFilter);
  }


  this.filteredJobs$ = this.store.select(selectAllJobs).pipe(
    map(jobs => jobs.filter(job => job.audioid === audioID))
  );

}















ngOnInit() {
  this.filtereduseCases$ = combineLatest([
    this.store.select(selectAllUseCase),
    this.useCaseControl.valueChanges.pipe(startWith(''))
  ]).pipe(
    map(([useCases, search]) => {
      if (typeof search === 'string') {
        return useCases.filter(u => u.name.toLowerCase().includes(search.toLowerCase()));
      } else {
        return useCases; // Quando selecionado diretamente
      }
    })
  );
}
