import { Injectable, inject, computed } from '@angular/core';
import { TopicJobStore } from './topic-job.store';

@Injectable({ providedIn: 'root' })
export class TopicJobFacade {

  private store = inject(TopicJobStore);

  // Signals expostos
  jobs = this.store.jobs;
  loading = this.store.loading;

  // 🔥 Computed: todos os topics achatados
  allTopics = computed(() =>
    this.jobs().flatMap(job => job.topics)
  );

  // 🔥 Topic selecionado (controlado pelo componente)
  selectedTopic = computed(() => null);

  load() {
    this.store.load();
  }

  startAutoRefresh() {
    this.store.startAutoRefresh(30000); // 30s
  }
}