import { Component, signal, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, BreadcrumbModule],
  template: `<p-breadcrumb [model]="items()"></p-breadcrumb>`,
})
export class BreadcrumbComponent {
  router = inject(Router);
  route = inject(ActivatedRoute);
  items = signal<MenuItem[]>([]);

  constructor() {
    effect(() => {
      this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
        this.updateBreadcrumb();
      });
    });
  }

  private updateBreadcrumb() {
    const breadcrumbItems: MenuItem[] = [];
    let url = '';

    this.route.root.children.forEach(route => {
      if (route.snapshot.url.length > 0) {
        url += '/' + route.snapshot.url.map(segment => segment.path).join('/');
        breadcrumbItems.push({
          label: route.snapshot.data['breadcrumb'] || route.snapshot.url[0].path,
          routerLink: url
        });
      }
    });

    this.items.set(breadcrumbItems);
  }
}



aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
SpeechRecognitionAlternative

import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Transcription } from './transcription.model';
import { selectAudioByID } from './store/selectors';

@Component({
  selector: 'app-transcription',
  templateUrl: './transcription.component.html',
})
export class TranscriptionComponent {
  transcriptions: Transcription[] = [];

  constructor(private store: Store) {
    this.store.select(selectAudioByID).subscribe(data => {
      this.transcriptions = data; // Armazena os dados diretamente no array
    });
  }
}
