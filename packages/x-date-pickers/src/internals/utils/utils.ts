import * as React from 'react';

/* Use it instead of .includes method for IE support */
export function arrayIncludes<T>(array: T[] | readonly T[], itemOrItems: T | T[]) {
  if (Array.isArray(itemOrItems)) {
    return itemOrItems.every((item) => array.indexOf(item) !== -1);
  }

  return array.indexOf(itemOrItems) !== -1;
}

export const onSpaceOrEnter =
  (
    innerFn: (ev: React.MouseEvent<any> | React.KeyboardEvent<any>) => void,
    onFocus?: (event: React.KeyboardEvent<any>) => void,
  ) =>
  (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      innerFn(event);

      // prevent any side effects
      event.preventDefault();
      event.stopPropagation();
    }

    if (onFocus) {
      onFocus(event);
    }
  };

export const executeInTheNextEventLoopTick = (fn: () => void) => {
  setTimeout(fn, 0);
};

export const doNothing = () => {};

export const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));
