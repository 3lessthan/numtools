define(
["../data/tests"],
function( tests ) {

  /**
   * Returns `true` if the value passed is of type 'string'
   * or 'number' and resembles either an integer or float.
   *
   * @param {number|string} value -
   *  The value to test for integer/float resemblance
   *
   * @returns {boolean} `true`/`false`
   */
  const isNumbery = function ( value ) {
    return typeof value === 'number' ||
         ( typeof value === 'string' && tests.numTest.test( value ) );
  };

  return isNumbery;

});