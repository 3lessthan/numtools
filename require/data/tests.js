define({
    numTest: new RegExp(/^[\-\+]?[\d]*\.?[\d]+$/),
  floatTest: new RegExp(/(?:^[\-\+]?[\d]*\.{1}[\d]+$)|(?:^[\-\+]?[\d]+\.{1}[\d]*$)/),
    intTest: new RegExp(/^[\-\+]?[\d]+$/)
});