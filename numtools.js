(function () {

  // TODO:
  //? Add minus() [Eloquent JS Example]
  //? Add polarShift()
  //? No need for anti-minus, use abs()
  //! ^ As noted above, there are some functions that may benefit from this rather than x - (i < 0 ? i * -1) --> x - abs(i)

  const numTest = new RegExp(/^[\-\+]?[\d]*\.?[\d]+$/);

  exports.zeroFill = function (number, len) {
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
       numi, numd;

    if (nIsF || (l1IsV && l2IsV && nIsN)) {
      let splitNum = number.indexOf('.') !== -1 ? number.split('.') : [number, ''];
      numi = splitNum[0];
      numd = splitNum[1];
    }

    if (lIsV || (l1IsV && !l2IsV)) {
      len = parseInt(lIsN ? len : len[0]);
      if (nIsN && !nIsF) while (this.getDigits(number) < len) number = '0' + number;
      else if (nIsF) {
        while (this.getDigits(numi) < len) numi = '0' + numi;
        number = numi + '.' + numd;
      }
    } else if (l1IsV && l2IsV && nIsN) {
      let li = len[0], ld = len[1];
      while (this.getDigits(numi) < li) numi = '0' + numi;
      while (this.getDigits(numd) < ld) numd = numd + '0';
      number = numi + (ld > 0 ? '.' + numd : '');
    }
    return number;
  };

  exports.isNumbery = function (value) {
    if (typeof value === 'number') return true;
    else if (typeof value === 'string') return numTest.test(value);
    else return false;
  };

  exports.isFloaty = function (value) {
    return this.isNumbery(value) && value.toString().indexOf('.') !== -1;
  };

  exports.getDigits = function (value) {
    let strValue = value.toString();
    if (this.isFloaty(value)) return strValue.length - (strValue.indexOf('.') !== 0 ? 1 : 0);
    else if (typeof value === 'number' && !this.isFloaty(value)) return strValue.length;
    else if (typeof value === 'string' && this.isNumbery(value)) return value.length;
    else return null;
  };

}).call(this);