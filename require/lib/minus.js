define(
["./isNumbery", "./isInty", "./isFloaty"],
function ( isNumbery, isInty, isFloaty ) {

  /**
   * - Given `a` - will return `-a`.
   * - Given `a`,`b`, will return `a-b`.
   *
   * @param {number}  a  -
   *  The number to subtract from or multiply by -1
   *
   * @param {number} [b] -
   *  If provided, subtracts from `a`
   *
   * @returns {number} -
   *  Negative `a`, the result of `a` minus `b`, or
   *  `0` if either value is not number-like.
   */
  const minus = function ( a, b ) {
    if (    isInty( a ) && !b ) return -parseInt( a );
    if (  isFloaty( a ) && !b ) return -parseFloat( a );
    if ( isNumbery( a ) && isNumbery( b ) ) return a - b;
    else return 0;
  };

  return minus;

});