import { Injectable, inject } from '@angular/core';
import { TopicCreateStore } from './topic-create.store';
import { CreateTopicDto } from '../models/topic-create.model';

@Injectable({ providedIn: 'root' })
export class TopicCreateFacade {

  private store = inject(TopicCreateStore);

  loading = this.store.loading;
  success = this.store.success;
  error = this.store.error;

  createTopic(data: CreateTopicDto) {
    this.store.create(data);
  }

  reset() {
    this.store.reset();
  }
}