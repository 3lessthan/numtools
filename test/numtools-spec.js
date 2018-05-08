const expect = require('chai').expect,
      sinion = require('sinon'),
      rewire = require('rewire'),
    numtools = rewire('../numtools.js');

// https://jsperf.com/isnumbery/1
describe("isNumbery(value)", () => {
  describe("Should return 'true' if:", () => {
    describe("value is of type 'number':", () => {
      it("always", () => {
        let tests = [10, -10, +10, 1.2, -1.2, +1.2, .2, -.2, +.2, 0];
        for (let i = 0; i < tests.length; i++) {
          expect(numtools.isNumbery(tests[i])).to.equal(true);
        }
      });
    });
    describe("value is of type 'string':", () => {
      describe("and value resembles:", () => {
        describe("an integer:", () => {
          it("signed", () => {
            let tests = ['-10', '+10'];
            for (let i = 0; i < tests.length; i++) {
              expect(numtools.isNumbery(tests[i])).to.equal(true);
            }
          });
          it("unsigned", () => {
            let tests = ['10', '0'];
            for (let i = 0; i < tests.length; i++) {
              expect(numtools.isNumbery(tests[i])).to.equal(true);
            }
          });
        });
        describe("a float:", () => {
          it("signed", () => {
            let tests = ['-1.2', '+1.2'];
            for (let i = 0; i < tests.length; i++) {
              expect(numtools.isNumbery(tests[i])).to.equal(true);
            }
          });
          it("unsigned", () => {
            let tests = ['1.2'];
            for (let i = 0; i < tests.length; i++) {
              expect(numtools.isNumbery(tests[i])).to.equal(true);
            }
          });
          it("signed   (with leading decimal)", () => {
            let tests = ['-.2', '+.2'];
            for (let i = 0; i < tests.length; i++) {
              expect(numtools.isNumbery(tests[i])).to.equal(true);
            }
          });
          it("unsigned (with leading decimal)", () => {
            let tests = ['.2'];
            for (let i = 0; i < tests.length; i++) {
              expect(numtools.isNumbery(tests[i])).to.equal(true);
            }
          });
        });
      });
    });
  });

  describe("Should return 'false' if:", () => {
    describe("value is of type 'string':", () => {
      describe("and value contains:", () => {
        it("non-numeric characters", () => {
          let tests = ['a', '00a', 'a00', '!00'];
          for (let i = 0; i < tests.length; i++) {
            expect(numtools.isNumbery(tests[i])).to.equal(false);
          }
        });
        it("more than one decimal", () => {
          let tests = ['192.168.0.0', '111.222.333'];
          for (let i = 0; i < tests.length; i++) {
            expect(numtools.isNumbery(tests[i])).to.equal(false);
          }
        });
        it("nothing (empty string)", () => {
          let test = '';
          expect(numtools.isNumbery(test)).to.equal(false);
        });
      });
    });
    describe("value is of type 'object' or 'boolean':",() => {
      it("always", () => {
        let tests = [[0], { 0: 0 }, false, true];
        for (let i = 0; i < tests.length; i++) {
          expect(numtools.isNumbery(tests[i])).to.equal(false);
        }
      });
    });
  });

});

describe("isFloaty(value)", () => {
  describe("Should return 'true' if:", () => {
    describe("value is of type 'number':", () => {
      describe("and value resembles:", () => {
        describe("a float:", () => {
          describe("with at least one nonzero value after the decimal:", () => {
            it("signed", () => {
              let tests = [-1.2, +1.2];
              for (let i = 0; i < tests.length; i++) {
                expect(numtools.isFloaty(tests[i])).to.equal(true);
              }
            });
            it("unsigned", () => {
              let tests = [1.2];
              for (let i = 0; i < tests.length; i++) {
                expect(numtools.isFloaty(tests[i])).to.equal(true);
              }
            });
            it("signed   (with leading decimal)", () => {
              let tests = [-.2, +.2];
              for (let i = 0; i < tests.length; i++) {
                expect(numtools.isFloaty(tests[i])).to.equal(true);
              }
            });
            it("unsigned (with leading decimal)", () => {
              let tests = [.2];
              for (let i = 0; i < tests.length; i++) {
                expect(numtools.isFloaty(tests[i])).to.equal(true);
              }
            });
          });
        });
      });
    });
    describe("value is of type 'string':", () => {
      describe("and value resembles:", () => {
        describe("a float:", () => {
          it("signed", () => {
            let tests = ['-1.2', '+1.2'];
            for (let i = 0; i < tests.length; i++) {
              expect(numtools.isFloaty(tests[i])).to.equal(true);
            }
          });
          it("unsigned", () => {
            let tests = ['1.2'];
            for (let i = 0; i < tests.length; i++) {
              expect(numtools.isFloaty(tests[i])).to.equal(true);
            }
          });
          it("signed   (with leading decimal)", () => {
            let tests = ['-.2', '+.2'];
            for (let i = 0; i < tests.length; i++) {
              expect(numtools.isFloaty(tests[i])).to.equal(true);
            }
          });
          it("unsigned (with leading decimal)", () => {
            let tests = ['.2'];
            for (let i = 0; i < tests.length; i++) {
              expect(numtools.isFloaty(tests[i])).to.equal(true);
            }
          });
        });
      });
    });
  });
  describe("Should return 'false' if:", () => {
    describe("value is of type 'number'", () => {
      describe("and value resembles:", () => {
        describe("an integer:", () => {
          it("always", () => {
            let tests = [10, -10, +10, 0];
            for (let i = 0; i < tests.length; i++) {
              expect(numtools.isFloaty(tests[i])).to.equal(false);
            }
          });
        });
        describe("a float:", () => {
          describe("with no nonzero values after the decimal:", () => {
            it("always", () => {
              let tests = [1.0, -1.0, +1.0, .0, -.0, +.0, 1.];
              for (let i = 0; i < tests.length; i++) {
                expect(numtools.isFloaty(tests[i])).to.equal(false);
              }
            });
          });
        });
      });
    });
    describe("value is of type 'string'", () => {
      describe("and value resembles:", () => {
        describe("an integer:", () => {
          it("always", () => {
            let tests = ['10', '-10', '+10', '0'];
            for (let i = 0; i < tests.length; i++) {
              expect(numtools.isFloaty(tests[i])).to.equal(false);
            }
          });
        });
      });
      describe("and value contains:", () => {
        it("non-numeric characters", () => {
          let tests = ['a.1', '00a.02', 'a00.1', '!00.2'];
          for (let i = 0; i < tests.length; i++) {
            expect(numtools.isFloaty(tests[i])).to.equal(false);
          }
        });
        it("more than one decimal", () => {
          let tests = ['192.168.0.0', '111.222.333'];
          for (let i = 0; i < tests.length; i++) {
            expect(numtools.isFloaty(tests[i])).to.equal(false);
          }
        });
        it("nothing (empty string)", () => {
          let test = '';
          expect(numtools.isFloaty(test)).to.equal(false);
        });
      });
    });
    describe("value is of type 'object' or 'boolean':", () => {
      it("always", () => {
        let tests = [[0], { 0: 0 }, false, true];
        for (let i = 0; i < tests.length; i++) {
          expect(numtools.isFloaty(tests[i])).to.equal(false);
        }
      });
    });
  });
});

describe('isFloaty(value, withLeadingDecimal)', () => {
  describe("Should return 'true' if:", () => {
    describe("isFloaty(value) test is true:", () => {
      describe("withLeadingDecimal is true:", () => {
        describe("value is of type 'number':", () => {
          it("value has a leading '.'", () => {
            let tests = [.9, -.9, +.9];
            for (let i = 0; i < tests.length; i++) {
              expect(numtools.isFloaty(tests[i], true)).to.equal(true);
            }
          });
          it("value has a leading '0'", () => {
            let tests = [0.9, -0.9, +0.9];
            for (let i = 0; i < tests.length; i++) {
              expect(numtools.isFloaty(tests[i], true)).to.equal(true);
            }
          });
        });
        describe("value is of type 'string':", () => {
          it("value has a leading '.'", () => {
            let tests = ['.9', '-.9', '+.9'];
            for (let i = 0; i < tests.length; i++) {
              expect(numtools.isFloaty(tests[i], true)).to.equal(true);
            }
          });
        });
      });
      describe("withLeadingDecimal is false:", () => {
        describe("value is of type 'number':", () => {
          it("value has a leading nonzero", () => {
            let tests = [1.9, -1.9, +1.9];
            for (let i = 0; i < tests.length; i++) {
              expect(numtools.isFloaty(tests[i], false)).to.equal(true);
            }
          });
        });
        describe("value is of type 'string':", () => {
          it("value has a leading nonzero", () => {
            let tests = ['1.9', '-1.9', '+1.9'];
            for (let i = 0; i < tests.length; i++) {
              expect(numtools.isFloaty(tests[i], false)).to.equal(true);
            }
          });
          it("value has a leading '0'", () => {
            let tests = ['0.9', '-0.9', '+0.9'];
            for (let i = 0; i < tests.length; i++) {
              expect(numtools.isFloaty(tests[i], false)).to.equal(true);
            }
          });
        });
      });
    });
  });
  describe("Should return 'false' if:", () => {
    describe("isFloaty(value) test is false:", () => {
      it('always', () => {
        let tests = ['9', '-9', '+9', 'aa.0', '0.0.0.0'];
        for (let i = 0; i < tests.length; i++) {
          expect(numtools.isFloaty(tests[i], false)).to.equal(false);
          expect(numtools.isFloaty(tests[i], true)).to.equal(false);
        }
      });
    });
    describe("isFloaty(value) test is true:", () => {
      describe("withLeadingDecimal is true:", () => {
        describe("value is of type 'number':", () => {
          it("value has a leading nonzero", () => {
            let tests = [1.9, -1.9, +1.9];
            for (let i = 0; i < tests.length; i++) {
              expect(numtools.isFloaty(tests[i], true)).to.equal(false);
            }
          });
        });
        describe("value is of type 'string':", () => {
          it("value has a leading nonzero", () => {
            let tests = ['1.9', '-1.9', '+1.9', '0.9', '-0.9', '+0.9'];
            for (let i = 0; i < tests.length; i++) {
              expect(numtools.isFloaty(tests[i], true)).to.equal(false);
            }
          });
          it("value has a leading '0'", () => {
            let tests = ['0.9', '-0.9', '+0.9'];
            for (let i = 0; i < tests.length; i++) {
              expect(numtools.isFloaty(tests[i], true)).to.equal(false);
            }
          });
        });
      });
      describe("withLeadingDecimal is false:", () => {
        describe("value is of type 'number':", () => {
          it("value has a leading '.'", () => {
            let tests = [.9, -.9, +.9];
            for (let i = 0; i < tests.length; i++) {
              expect(numtools.isFloaty(tests[i], false)).to.equal(false);
            }
          });
          it("value has a leading '0'", () => {
            let tests = [0.9, -0.9, +0.9];
            for (let i = 0; i < tests.length; i++) {
              expect(numtools.isFloaty(tests[i], false)).to.equal(false);
            }
          });
        });
        describe("value is of type 'string':", () => {
          it("value has a leading '.'", () => {
            let tests = ['.9', '-.9', '+.9'];
            for (let i = 0; i < tests.length; i++) {
              expect(numtools.isFloaty(tests[i], false)).to.equal(false);
            }
          });
        });
      });
    });
  });
});