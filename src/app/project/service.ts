import { Injectable, signal } from '@angular/core';
import { Project } from '../models/project.model';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  saveProject(project: Project): Observable<Project> {
    console.log('Salvando projeto no backend', project);
    return of(project).pipe(delay(1000)); // simula request HTTP
  }
}
