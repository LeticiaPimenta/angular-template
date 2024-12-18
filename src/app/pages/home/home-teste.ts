import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { selectAllAudios, selectAllAudioLoading } from '../../store/audio.selectors';
import { Item } from '../../models/item.model';

@Component({
  selector: 'app-audio-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatTabsModule],
  templateUrl: './audio-list.component.html',
  styleUrls: ['./audio-list.component.css'],
})
export class AudioListComponent {
  allAudios$: Observable<Item[]>;  // Observable para os áudios
  filteredAudios$: Observable<Item[]>;  // Observable para os áudios filtrados
  loading$: Observable<boolean>;  // Observable para o estado de carregamento
  filterSubject = new BehaviorSubject<string>('ALL');  // Filtro inicial para 'ALL'
  dataSource = new MatTableDataSource<Item>();  // DataSource da tabela
  displayedColumns: string[] = ['id', 'name', 'status'];  // Colunas da tabela

  constructor(private store: Store) {
    // Obtemos os áudios e o estado de carregamento do store
    this.allAudios$ = this.store.select(selectAllAudios);
    this.loading$ = this.store.select(selectAllAudioLoading);

    // Inicializa o Observable com dados vazios, caso não exista
    this.filteredAudios$ = this.filterSubject.pipe(
      switchMap((filter) => {
        return this.allAudios$.pipe(
          map((audios) => {
            // Verifica se 'audios' é undefined ou null
            const validAudios = audios || [];
            return filter === 'ALL'
              ? validAudios
              : validAudios.filter((audio) => audio.status === filter);
          })
        );
      })
    );

    // Atualiza o dataSource sempre que filteredAudios$ emite novos valores
    this.filteredAudios$.subscribe((audios) => {
      this.dataSource.data = audios || [];
    });
  }

  // Atualiza o filtro com base na aba selecionada
  onTabChange(index: number) {
    const filters = ['ALL', 'COMPLETED', 'RUNNING', 'FAILED', 'PENDING'];
    const selectedFilter = filters[index];
    this.filterSubject.next(selectedFilter);
  }
}



///
this.filteredAudios$ = this.filterSubject.pipe(
    switchMap((filter) => {
      return this.allAudios$.pipe(
        map((audios) => {
          // Verifica se 'audios' é undefined ou null
          const validAudios = audios || [];
          return filter === 'ALL'
            ? validAudios
            : validAudios.filter((audio) => audio.status === filter);
        })
      );
    })
  );
