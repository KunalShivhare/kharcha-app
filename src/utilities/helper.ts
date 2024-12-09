/*
 * Returns a throttled function, of given function with given
 * number of delay in ms
 */
export function throttle(func: (...args: any) => void, delay: number) {
  let wait = false;
  let argument: any | null = null;
  return (...args: any) => {
    argument = args;
    if (wait) {
      return;
    }

    wait = true;
    setTimeout(() => {
      wait = false;
      argument && func(...argument);
      argument = null;
    }, delay);
  };
}

export const promiseAllSettled = (promises: Array<Promise<any>>) => {
  return Promise.all(
    promises.map(promise =>
      promise
        .then(value => ({ status: 'fulfilled', value }))
        .catch(reason => ({ status: 'rejected', reason })),
    ),
  );
};
