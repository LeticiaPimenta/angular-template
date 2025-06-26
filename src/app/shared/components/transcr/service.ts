// services/audio.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AudioResponse } from '../models/audio-response.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AudioService {
  constructor(private http: HttpClient) {}

  getAudioData(id: string): Observable<AudioResponse> {
    return this.http.get<AudioResponse>(`/api/audio/${id}`);
  }
}
