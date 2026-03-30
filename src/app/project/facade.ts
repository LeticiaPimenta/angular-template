import { Injectable, signal, WritableSignal, computed } from '@angular/core';
import { Project } from '../models/project.model';
import { ProjectService } from '../services/project.service';

@Injectable({ providedIn: 'root' })
export class ProjectFacade {
  // Signals do estado
  project: WritableSignal<Project> = signal<Project>({
    projectTitle: '',
    description: '',
    selectedAuthor: '',
    isActive: false,
    countryBusinessUnit: ''
  });

  loading = signal(false);
  error = signal<string | null>(null);

  constructor(private service: ProjectService) {}

  saveProject() {
    const currentProject = this.project();
    this.loading.set(true);
    this.error.set(null);

    this.service.saveProject(currentProject).subscribe({
      next: (res) => {
        this.project.set(res); // atualiza signal
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Erro ao salvar projeto');
        this.loading.set(false);
      }
    });
  }

  // Exemplo de computed para validar formulário
  isFormValid = computed(() =>
    !!this.project().projectTitle && !!this.project().selectedAuthor
  );
}
