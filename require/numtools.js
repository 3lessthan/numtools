define([
  "./lib/diff",
  "./lib/digits",
  "./lib/isFloaty",
  "./lib/isInty",
  "./lib/isNumbery",
  "./lib/isSigned",
  "./lib/minus",
  "./lib/zeroFill"
],( isNumbery, diff, digits, isFloaty, isInty, isSigned, minus, zeroFill ) => {
  return {
    isNumbery: isNumbery,
         diff: diff,
       digits: digits,
     isFloaty: isFloaty,
       isInty: isInty,
     isSigned: isSigned,
        minus: minus,
     zeroFill: zeroFill
  };
});