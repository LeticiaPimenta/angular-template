import { Component, inject, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { TopicJobFacade } from '../store/topic-job.facade';
import { Topic } from '../models/topic-job.model';

@Component({
  standalone: true,
  selector: 'app-topic-jobs',
  imports: [NgFor, NgIf],
  templateUrl: './topic-jobs-page.component.html'
})
export class TopicJobsPageComponent {

  facade = inject(TopicJobFacade);

  // dropdown state local
  selectedTopic = signal<Topic | null>(null);

  ngOnInit() {
    this.facade.load();
    this.facade.startAutoRefresh();
  }

  get topics() {
    return this.facade.allTopics();
  }

  onTopicChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    const topic = this.topics.find(t => t.id === value);
    this.selectedTopic.set(topic ?? null);
  }
}