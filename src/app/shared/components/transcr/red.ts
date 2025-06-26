// store/audio/audio.reducer.ts

import { createReducer, on } from '@ngrx/store';
import * as AudioActions from './audio.actions';
import { AudioResponse } from '../../models/audio-response.model';

export interface AudioState {
  audio: AudioResponse | null;
  loading: boolean;
  error: any;
}

export const initialState: AudioState = {
  audio: null,
  loading: false,
  error: null,
};

export const audioReducer = createReducer(
  initialState,
  on(AudioActions.loadAudio, state => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AudioActions.loadAudioSuccess, (state, { audio }) => ({
    ...state,
    audio,
    loading: false,
  })),
  on(AudioActions.loadAudioFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
