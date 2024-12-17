import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { FilterTabDirective } from '../../shared/filter-tab.directive';
import { Item } from '../../shared/models/item.model';


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

    // Atualiza o dataSource sempre que filteredItems$ emite valores
    this.filteredItems$.subscribe((items) => {
      console.log(this.allItems$);
      this.dataSource.data = items || []; // Garante que a dataSource nunca receba null
      console.log(items);
    });
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
}
