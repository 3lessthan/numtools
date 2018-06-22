define(["../data/tests"], function ( tests ) {

  /**
   * Returns `true` if the value passed is of type 'string'
   * or 'number' and resembles an integer.
   *
   * @param {number|string} value -
   * The value to test for integer resemblance
   *
   * @returns {boolean} `true`/`false`
   */
  const isInty = function ( value ) {
    return ( typeof value === 'number' || typeof value === 'string' ) &&
            tests.intTest.test( value );
  };

  return isInty;

});