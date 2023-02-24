export default function useDebounce(fn: (...args: any) => void, delay: number) {
  let timeoutID: NodeJS.Timeout; // Initially undefined

  return function (...args: any) {
    if (timeoutID) {
      clearTimeout(timeoutID);
    }

    timeoutID = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}
