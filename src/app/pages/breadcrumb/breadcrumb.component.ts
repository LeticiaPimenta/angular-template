import { Component, OnInit, inject } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NgIf, NgFor } from '@angular/common';

interface Breadcrumb {
  label: string;
  url: string;
}

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [NgIf, NgFor],
  template: `
    <nav *ngIf="breadcrumbs.length > 0" class="breadcrumb">
      <ul>
        <li *ngFor="let breadcrumb of breadcrumbs; let last = last">
          <a *ngIf="!last; else lastBreadcrumb" [routerLink]="breadcrumb.url">{{ breadcrumb.label }}</a>
          <ng-template #lastBreadcrumb><span>{{ breadcrumb.label }}</span></ng-template>
        </li>
      </ul>
    </nav>
  `,
  styles: [`
    .breadcrumb ul {
      list-style: none;
      display: flex;
      padding: 10px;
      background: #f8f9fa;
      border-radius: 5px;
    }
    .breadcrumb li {
      margin-right: 8px;
    }
    .breadcrumb li a {
      text-decoration: none;
      color: #007bff;
    }
    .breadcrumb li span {
      font-weight: bold;
    }
    .breadcrumb li:not(:last-child)::after {
      content: '>';
      margin-left: 8px;
      color: gray;
    }
  `]
})
export class BreadcrumbComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  breadcrumbs: Breadcrumb[] = [];

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.breadcrumbs = this.createBreadcrumbs(this.route.root);
    });
  }

  private createBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {
    const children = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL = child.snapshot.url.map(segment => segment.path).join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      if (child.snapshot.data['title']) {
        breadcrumbs.push({
          label: child.snapshot.data['title'],
          url: url
        });
      }

      return this.createBreadcrumbs(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }
}
