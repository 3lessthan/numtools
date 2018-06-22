define(
["./isNumbery"],
function ( isNumbery ) {

  /**
   * Given `a`, `b` - will return the absolute difference.
   *
   * @param {number} a -
   *  The number to subtract from
   *
   * @param {number} b -
   *  The number to subtract
   *
   * @returns {number} -
   *  The absolute difference of `a` and `b`, or
   *  `0` if either value is not number-like.
   */
  const diff = function (a, b) {
    if (isNumbery(a) && isNumbery(b)) return Math.abs(a - b);
    else return 0;
  };

  return diff;

});