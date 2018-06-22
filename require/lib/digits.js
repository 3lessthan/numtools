define(
["./isNumbery","./isInty","./isFloaty"],
function ( isNumbery, isInty, isFloaty ) {

  /**
   * Returns the number of digits the value passed possesses.
   * Trailing zeroes are ignored if the passed value is of
   * type 'number' & numbers with leading decimals count
   * the invisible zero.
   *
   * @param {number|string} value -
   *  The value to count digits for
   *
   * @returns {number} -
   *  The number of digits the passed value posesses
   */
  const digits = function ( value ) {
    let strValue = String( value ),
          offset = strValue.indexOf( '-' ) === 0 || strValue.indexOf( '+' ) === 0 ?
                   1 : 0;

    if ( isFloaty( value ) )
      return strValue.length - ( strValue.indexOf('.') !== 0 + offset ? 1 + offset : 0 + offset) ;
    else if ( typeof value === 'number' && isInty( value ) )
      return strValue.length;
    else if ( typeof value === 'string' && isNumbery( value ) )
      return value.length;
  };

  return digits;

});