import { inject } from '@angular/core';
import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap, timer, fromEvent, merge } from 'rxjs';
import { TopicJob } from '../models/topic-job.model';
import { TopicJobService } from '../services/topic-job.service';

export interface TopicJobState {
  jobs: TopicJob[];
  loading: boolean;
  error: any;
}

const initialState: TopicJobState = {
  jobs: [],
  loading: false,
  error: null
};

export const TopicJobStore = signalStore(
  { providedIn: 'root' },

  withState(initialState),

  withMethods((store, service = inject(TopicJobService)) => ({

    // 🔹 Load manual
    load: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { loading: true })),
        switchMap(() =>
          service.getJobs().pipe(
            tap({
              next: (jobs) =>
                patchState(store, { jobs, loading: false }),
              error: (error) =>
                patchState(store, { error, loading: false })
            })
          )
        )
      )
    ),

    // 🔥 Auto Refresh Inteligente
    startAutoRefresh: rxMethod<number>(
      pipe(
        switchMap((intervalMs) => {

          const visible$ = fromEvent(document, 'visibilitychange');
          const focus$ = fromEvent(window, 'focus');
          const interval$ = timer(0, intervalMs);

          return merge(visible$, focus$, interval$).pipe(
            switchMap(() =>
              service.getJobs()
            ),
            tap(jobs =>
              patchState(store, { jobs })
            )
          );

        })
      )
    )

  }))
);