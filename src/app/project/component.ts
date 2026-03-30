import { Component } from '@angular/core';
import { ProjectFacade } from '../store/project.facade';

@Component({
  selector: 'app-project-form',
  standalone: true,
  template: `
    <div>
      <input
        [value]="facade.project().projectTitle"
        (input)="facade.project().projectTitle = $any($event.target).value"
        placeholder="Project Title"
      />

      <textarea
        [value]="facade.project().description"
        (input)="facade.project().description = $any($event.target).value"
        placeholder="Description"
      ></textarea>

      <input
        [value]="facade.project().selectedAuthor"
        (input)="facade.project().selectedAuthor = $any($event.target).value"
        placeholder="Author"
      />

      <label>
        <input
          type="checkbox"
          [checked]="facade.project().isActive"
          (change)="facade.project().isActive = $any($event.target).checked"
        />
        Active
      </label>

      <input
        [value]="facade.project().countryBusinessUnit"
        (input)="facade.project().countryBusinessUnit = $any($event.target).value"
        placeholder="Country BU"
      />

      <button
        (click)="facade.saveProject()"
        [disabled]="facade.loading() || !facade.isFormValid()"
      >
        Save
      </button>

      <div *ngIf="facade.loading()">Saving...</div>
      <div *ngIf="facade.error()">{{ facade.error() }}</div>
    </div>
  `
})
export class ProjectFormComponent {
  constructor(public facade: ProjectFacade) {}
}
