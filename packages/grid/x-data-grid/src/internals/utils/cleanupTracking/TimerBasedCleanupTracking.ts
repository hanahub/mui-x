import { CleanupTracking, UnregisterToken, UnsubscribeFn } from './CleanupTracking';

// If no effect ran after this amount of time, we assume that the render was not committed by React
const CLEANUP_TIMER_LOOP_MILLIS = 1000;

export class TimerBasedCleanupTracking implements CleanupTracking {
  timeouts = new Map<number, NodeJS.Timeout>();

  register(object: any, unsubscribe: UnsubscribeFn, unregisterToken: UnregisterToken): void {
    const timeout = setTimeout(() => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
      this.timeouts.delete(unregisterToken.cleanupToken);
    }, CLEANUP_TIMER_LOOP_MILLIS);

    this.timeouts.set(unregisterToken!.cleanupToken, timeout);
  }

  unregister(unregisterToken: UnregisterToken): void {
    const timeout = this.timeouts.get(unregisterToken.cleanupToken);
    if (timeout) {
      this.timeouts.delete(unregisterToken.cleanupToken);
      clearTimeout(timeout);
    }
  }
}
