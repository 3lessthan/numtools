define(["../data/tests"], function (tests) {

  /**
   * Returns `true` if the value passed is of type 'string'
   * or 'number' and resembles a float.
   *
   * - Optionally, test whether or not it has a leading
   *   decimal as well.
   *
   * @param {number|string} value -
   *  The value to test for float resemblance
   *
   * @param {boolean} [withLeadingDecimal] -
   *  [Optional] If `true`, tests whether the value has a
   *  leading decimal as well.
   *
   * @returns {boolean} `true`/`false`
   */
  const isFloaty = function (value, withLeadingDecimal) {
    if ((typeof value === 'number' || typeof value === 'string') && tests.floatTest.test(value)) {
      if (withLeadingDecimal === undefined)
        return true;
      else {
        let decimalPos = typeof value === 'number' ? String(value).indexOf('0.') : value.indexOf('.'),
                offset = (String(value).indexOf('-') === 0 || String(value).indexOf('+') === 0) ? 1 : 0;
        return (withLeadingDecimal && decimalPos === offset) || (!withLeadingDecimal && decimalPos !== offset);
      }
    } else return false;
  };

  return isFloaty;

});