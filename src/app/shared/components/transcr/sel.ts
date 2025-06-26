// store/audio/audio.selectors.ts

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AudioState } from './audio.reducer';

export const selectAudioState = createFeatureSelector<AudioState>('audio');

export const selectAudio = createSelector(
  selectAudioState,
  state => state.audio
);

export const selectAudioLoading = createSelector(
  selectAudioState,
  state => state.loading
);

export const selectAudioError = createSelector(
  selectAudioState,
  state => state.error
);
