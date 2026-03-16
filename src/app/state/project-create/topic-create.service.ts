import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateTopicDto } from '../models/topic-create.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TopicCreateService {

  private http = inject(HttpClient);

  createTopic(data: CreateTopicDto): Observable<any> {
    return this.http.post('/api/topics', data);
  }

}