// components/audio/audio.component.ts

import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadAudio } from '../../store/audio/audio.actions';
import { selectAudio, selectAudioLoading } from '../../store/audio/audio.selectors';

@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
})
export class AudioComponent {
  audio$ = this.store.select(selectAudio);
  loading$ = this.store.select(selectAudioLoading);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadAudio({ id: '12849238' }));
  }
}
