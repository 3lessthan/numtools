(function () {

  // TODO:
  //? Add polarShift()?
  //! ^ As noted above, there are some functions that may benefit from this rather than x - (i < 0 ? i * -1) --> x - abs(i)

  const numTest = new RegExp(/^[\-\+]?[\d]*\.?[\d]+$/),
      floatTest = new RegExp(/(?:^[\-\+]?[\d]*\.{1}[\d]+$)|(?:^[\-\+]?[\d]+\.{1}[\d]*$)/),
        intTest = new RegExp(/^[\-\+]?[\d]+$/);

  /**
   * Returns `true` if the value passed is of type 'string' or 'number' and resembles either an integer or float.
   * @param {number|string} value  The value to test for integer/float resemblance
   * @returns {boolean}            `true`/`false`
   */
  exports.isNumbery = function (value) {
    return typeof value === 'number' || (typeof value === 'string' && numTest.test(value));
  };

  /**
   * Returns `true` if the value passed is of type 'string' or 'number' and resembles an integer.
   * @param {number|string} value  The value to test for integer resemblance
   * @returns {boolean}            `true`/`false`
   */
  exports.isInty = function (value) {
    return (typeof value === 'number' || typeof value === 'string') && intTest.test(value);
  };

  /**
   * Returns `true` if the value passed is of type 'string' or 'number' and resembles a float.
   *  Optionally, test whether or not it has a leading decimal as well.
   * @param {number|string} value                  The value to test for float resemblance
   * @param {boolean}       [withLeadingDecimal]   [Optional] If `true`, tests whether the value has a leading decimal as well.
   * @returns {boolean}                            `true`/`false`
   */
  exports.isFloaty = function (value, withLeadingDecimal) {
    if ((typeof value === 'number' || typeof value === 'string') && floatTest.test(value)) {
      if (withLeadingDecimal === undefined) return true;
      else {
        let decimalPos = typeof value === 'number' ? value.toString().indexOf('0.') : value.indexOf('.'),
                offset = (value.toString().indexOf('-') === 0 || value.toString().indexOf('+') === 0) ? 1 : 0;
        return (withLeadingDecimal && decimalPos === offset) || (!withLeadingDecimal && decimalPos !== offset);
      }
    } else return false;
  };

  /**
   * Indicates whether the value isNumbery & has a +/- preceding it.
   * @param {number|string} value The value to test
   * @returns {boolean}
   */
  exports.isSigned = function (value) {
    return this.isNumbery(value) && (value.toString().indexOf('-') === 0 || value.toString().indexOf('+') === 0);
  };

  /**
   * Given `a` - will return `-a`.
   * Given `a`,`b`, will return `a-b`.
   * @param {number}  a  The number to subtract from or multiply by -1
   * @param {number} [b] If provided, subtracts from `a`
   * @returns {number}
   */
  exports.minus = function (a, b) {
    if (this.isInty(a) && b === undefined) return -parseInt(a);
    else if (this.isFloaty(a) && b === undefined) return -parseFloat(a);
    else if (this.isNumbery(a) && this.isNumbery(b)) return a - b;
    else return 0;
  };

  /**
   * Given `a`, `b` - will return the absolute difference.
   * @param {number} a The number to subtract from
   * @param {number} b The number to subtract
   * @returns {number}
   */
  exports.diff = function (a, b) {
    if (this.isNumbery(a) && this.isNumbery(b)) return Math.abs(a - b);
    else return 0;
  };

  //? Using isFloaty(strValue,true) & isFloaty(strValue,false) to differentiate returns is inefficient.
  //? It would require 1 extra call to isFloaty, also it changes output if you dont use strValue
  /**
   * Returns the number of digits the value passed possesses. Trailing zeroes are ignored if
   * the passed value is of type 'number' & numbers with leading decimals count the invisible zero.
   * @param {number|string} value The value to count digits for
   * @returns {number}            The number of digits the passed value posesses
   */
  exports.countDigits = function (value) {
    let strValue = value.toString(),
          offset = strValue.indexOf('-') === 0 || strValue.indexOf('+') === 0 ? 1 : 0;
    if (this.isFloaty(value)) return strValue.length - (strValue.indexOf('.') !== 0 + offset ? 1 + offset : 0 + offset);
    else if (typeof value === 'number' && this.isInty(value)) return strValue.length;
    else if (typeof value === 'string' && this.isNumbery(value)) return value.length;
    else return null;
  };

  /**
   * Given a `number`; pad it with zeroes until it has at least `len` digits. If `len` is an array,
   *  the first value represents the minimum number of digits that should precede the decimal (if there is one),
   *  and the second, if provided, represents the minimum number of digits that should come after it.
   *  If `number` is an integer and two digits are passed to `len`, it will be converted to a float with `len[1]` zeroes after the decimal.
   * @param {number|string} number The number to pad with zeroes.
   * @param {number[]}      len    [Integer] The minimum amount of digits `number` should have on either side of the decimal.
   * @returns {string}      Zero-padded `number` as a string with at least `len` digits.
   */
  exports.zeroFill = function (number, len) {
    if (number!==undefined && len===undefined) return number;
    else if (number!==undefined && len!==undefined) {
      number = number.toString();
      let nIsN = this.isNumbery(number),
          lIsN = this.isNumbery(len),
         l1IsN = this.isNumbery(len[0]),
         l2IsN = this.isNumbery(len[1]),
          nIsF = this.isFloaty(number),
          lIsF = this.isFloaty(len),
         l1IsF = this.isFloaty(len[0]),
         l2IsF = this.isFloaty(len[1]),
          lIsV = (lIsN && !lIsF),
         l1IsV = (l1IsN && !l1IsF),
         l2IsV = (l2IsN && !l2IsF),
          nIsS = number.indexOf('-') === 0 || number.indexOf('+') === 0,
          numi, numd, s='';

      if (nIsS) {
        s = number.substr(0,1);
        number = number.substr(1);
      }

      if (nIsF || (l1IsV && l2IsV && nIsN)) {
        let splitNum = number.indexOf('.') !== -1 ? number.split('.') : [number, ''];
        numi = splitNum[0];
        numd = splitNum[1];
      }

      if (lIsV || (l1IsV && !l2IsV)) {
        len = parseInt(lIsN ? len : len[0]);
        if (nIsN && !nIsF) while (this.countDigits(number) < len) number = '0' + number;
        else if (nIsF) {
          while (this.countDigits(numi) < len) numi = '0' + numi;
          number = numi + '.' + numd;
        }
      } else if (l1IsV && l2IsV && nIsN) {
        let li = len[0], ld = len[1];
        while (this.countDigits(numi) < li) numi = '0' + numi;
        while (this.countDigits(numd) < ld) numd = numd + '0';
        number = numi + (ld > 0 ? '.' + numd : '');
      }
      return s+number;
    }
  };

}).call(this);