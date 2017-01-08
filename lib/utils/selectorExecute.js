"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function selectorExecute(browser, selectors, code) {
  for (var _len = arguments.length, args = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    args[_key - 3] = arguments[_key];
  }

  var allElements, i, selected;
  return _regenerator2.default.async(function selectorExecute$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!(selectors instanceof Array)) {
            selectors = [selectors];
          }

          allElements = [];
          i = 0;

        case 3:
          if (!(i != selectors.length)) {
            _context.next = 12;
            break;
          }

          _context.next = 6;
          return _regenerator2.default.awrap(element.all(by.css(selectors[i])));

        case 6:
          _context.t0 = function (e) {
            return e.getWebElement();
          };

          selected = _context.sent.map(_context.t0);


          allElements = allElements.concat(selected);

        case 9:
          ++i;
          _context.next = 3;
          break;

        case 12:
          return _context.abrupt("return", browser.executeScript.apply(browser, [code, allElements].concat(args)));

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, this);
};