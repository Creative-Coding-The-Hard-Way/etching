import P5 from "p5";

/**
 * Runs the given function inside a push() pop() pair.
 *
 * Always calls pop(), even if fn throws an exception.
 *
 * @param p5 - the P5 library instance
 * @param fn - a function to run between calls to push() and pop()
 */
export function pushpop<T>(p5: P5, fn: (p5: P5) => T): T {
  try {
    p5.push();
    return fn(p5);
  } finally {
    p5.pop();
  }
}
