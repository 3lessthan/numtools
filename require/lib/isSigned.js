define(
["./isNumbery"],
function( isNumbery ) {

  /**
   * Indicates whether the value isNumbery and
   * has a `+`/`-` preceding it.
   *
   * @param {number|string} value -
   *  The number-like value to test
   *
   * @returns {boolean} `true`/`false`
   */
  const isSigned = function ( value ) {
    return isNumbery( value ) && (
              String( value ).indexOf( '-' ) === 0 ||
              String( value ).indexOf( '+' ) === 0 );
  };

  return isSigned;

});