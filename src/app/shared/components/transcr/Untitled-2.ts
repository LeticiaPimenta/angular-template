// store/audio/audio.actions.ts

import { createAction, props } from '@ngrx/store';
import { AudioResponse } from '../../models/audio-response.model';

export const loadAudio = createAction(
  '[Audio] Load Audio',
  props<{ id: string }>()
);

export const loadAudioSuccess = createAction(
  '[Audio] Load Audio Success',
  props<{ audio: AudioResponse }>()
);

export const loadAudioFailure = createAction(
  '[Audio] Load Audio Failure',
  props<{ error: any }>()
);
