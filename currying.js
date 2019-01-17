/*
 * currying: taking a function whose arity is greater than 1 and unravelling it
 * to multiple, chained functions of arity 1
 *
 * example from functional light, p. 71
 * */

// fn.length only works with non-variadic, non-destructured params
function curry (fn, arity = fn.length) {
  // kick off the currying with an empty array
  return (function nextCurried(prevArgs) {
    return function curried(nextArg) {
      // collect
      var args = [ ...prevArgs, nextArg ];
      // once we've unravelled
      if (args.length >= arity) {
        // call the closed-over fn with those args
        return fn( ...args );
      // otherwise
      } else {
        // keeping unravelling
        return nextCurried( args );
      }
    };
  })( [] );
}

// toy fn for currying
function sum (a,b,c,d){
  return a + b + c + d;
}

// curried fn
const curried = curry(sum);

// what the `engine` of currying looks like
console.log('curried', curried);
// returns 10
console.log(curried(1)(2)(3)(4))

