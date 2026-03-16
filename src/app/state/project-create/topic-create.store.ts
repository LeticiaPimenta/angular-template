import { inject } from '@angular/core';
import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { TopicCreateService } from '../services/topic-create.service';
import { CreateTopicDto } from '../models/topic-create.model';

export interface TopicCreateState {
  loading: boolean;
  success: boolean;
  error: any;
}

const initialState: TopicCreateState = {
  loading: false,
  success: false,
  error: null
};

export const TopicCreateStore = signalStore(

  { providedIn: 'root' },

  withState(initialState),

  withMethods((store, api = inject(TopicCreateService)) => ({

    create: rxMethod<CreateTopicDto>(
      pipe(

        tap(() =>
          patchState(store, {
            loading: true,
            success: false,
            error: null
          })
        ),

        switchMap((payload) =>
          api.createTopic(payload).pipe(

            tap({
              next: () =>
                patchState(store, {
                  loading: false,
                  success: true
                }),

              error: (error) =>
                patchState(store, {
                  loading: false,
                  error
                })
            })

          )
        )

      )
    ),

    reset() {
      patchState(store, initialState);
    }

  }))
);