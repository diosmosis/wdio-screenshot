"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function setViewportSize(browser, _ref) {
  var width = _ref.width,
      height = _ref.height;
  var heightDelta;
  return _regenerator2.default.async(function setViewportSize$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _regenerator2.default.awrap(browser.executeScript(function () {
            return window.outerHeight - window.innerHeight;
          }));

        case 2:
          heightDelta = _context.sent;

          browser.driver.manage().window().setSize(width, height + heightDelta);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  }, null, this);
};