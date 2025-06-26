// store/audio/audio.effects.ts

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AudioActions from './audio.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { AudioService } from '../../services/audio.service';

@Injectable()
export class AudioEffects {
  constructor(private actions$: Actions, private audioService: AudioService) {}

  loadAudio$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AudioActions.loadAudio),
      mergeMap(action =>
        this.audioService.getAudioData(action.id).pipe(
          map(audio => AudioActions.loadAudioSuccess({ audio })),
          catchError(error => of(AudioActions.loadAudioFailure({ error })))
        )
      )
    )
  );
}
