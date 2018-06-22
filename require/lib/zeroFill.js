define(
["./isNumbery", "./isFloaty", "./digits"],
function( isNumbery, isFloaty, digits ) {

  /**
   * Given a `number`; pad it with zeroes until it has at
   * least `len` digits. If `len` is an array, the first
   * value represents the minimum number of digits that
   * should precede the decimal (if there is one), and the
   * second, if provided, represents the minimum number of
   * digits that should come after it.
   *
   * If `number` is an integer and two digits are passed to
   * `len`, it will be converted to a float with `len[1]`
   * zeroes after the decimal.
   *
   * @param {number|string} number -
   *  The number to pad with zeroes.
   *
   * @param {number[]} len -
   *  [Integer] The minimum amount of digits `number`
   *  should have on either side of the decimal.
   *
   * @returns {string} -
   *  Zero-padded `number` as a string with at least
   *  `len` number of digits.
   */
  const zeroFill = function ( number, len ) {
    if ( number !== undefined ) {
      if ( !len ) return number;
      number   = String( number );
      let nIsN = isNumbery( number ),
          lIsN = isNumbery( len ),
         l1IsN = isNumbery( len[0] ),
         l2IsN = isNumbery( len[1] ),
          nIsF =  isFloaty( number ),
          lIsF =  isFloaty( len ),
         l1IsF =  isFloaty( len[0] ),
         l2IsF =  isFloaty( len[1] ),
          lIsV = (  lIsN && !lIsF  ),
         l1IsV = ( l1IsN && !l1IsF ),
         l2IsV = ( l2IsN && !l2IsF ),
          nIsS = number.indexOf( '-' ) === 0 ||
                 number.indexOf( '+' ) === 0,
          numi, numd, s = '';

      if ( nIsS ) {
             s = number.substr( 0, 1 );
        number = number.substr( 1 );
      }

      if ( nIsF || ( l1IsV && l2IsV && nIsN ) ) {
        let splitNum = number.indexOf( '.' ) !== -1 ?
                       number.split( '.' ) : [number, ''];
        numi = splitNum[0];
        numd = splitNum[1];
      }

      if ( lIsV || ( l1IsV && !l2IsV ) ) {
        len = parseInt( lIsN ? len : len[0] );
        if ( nIsN && !nIsF )
          while ( digits( number ) < len ) number = '0' + number;
        else if ( nIsF ) {
          while ( digits( numi ) < len ) numi = '0' + numi;
          number = numi + '.' + numd;
        }
      } else if ( l1IsV && l2IsV && nIsN ) {
        let li = len[0], ld = len[1];
        while ( digits( numi ) < li ) numi = '0' + numi;
        while ( digits( numd ) < ld ) numd = numd + '0';
        number = numi + ( ld > 0 ? '.' + numd : '' );
      }
      return s + number;
    }
  };

  return zeroFill;

});