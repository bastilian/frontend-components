"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.severityLevels = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var severityLevels = ['high', 'medium', 'low', 'unknown'];
exports.severityLevels = severityLevels;

var _default = function _default(count) {
  var currentCount = 0;
  return (0, _toConsumableArray2["default"])(new Array(count > 0 ? count : 1)).map(function () {
    currentCount++;
    return {
      id: currentCount,
      severity: severityLevels[currentCount % 4],
      name: 'TEST ITEM #' + currentCount,
      description: 'DESCRIPTION'
    };
  }).sort();
};

exports["default"] = _default;