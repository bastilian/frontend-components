"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterHelpers = exports.renderJson = void 0;

var _enzyme = require("enzyme");

var _enzymeToJson = _interopRequireDefault(require("enzyme-to-json"));

var _react = require("@testing-library/react");

var _dom = require("@testing-library/dom");

var _userEvent = _interopRequireDefault(require("@testing-library/user-event"));

var renderJson = function renderJson(component) {
  return (0, _enzymeToJson["default"])((0, _enzyme.shallow)(component));
};

exports.renderJson = renderJson;

var toggleFilterDropDown = function toggleFilterDropDown(container) {
  var filterToggle = container.querySelector('button.pf-c-dropdown__toggle');

  _userEvent["default"].click(filterToggle);
};

var clickFilter = function clickFilter(filterButton) {
  _userEvent["default"].click(filterButton);
};

var queryFilterButton = function queryFilterButton(toolbar, query) {
  return (0, _dom.queryByText)(toolbar.querySelector('.ins-c-conditional-filter'), query, {
    selector: 'button'
  });
};

var validateAndOpenFilterSelectable = function validateAndOpenFilterSelectable(toolbar, filter) {
  var currentFilter = queryFilterButton(toolbar, filter.label);

  if (currentFilter) {
    clickFilter(currentFilter);
  }

  return !!currentFilter;
};

var filterValidations = {
  group: function group(toolbar, filter) {
    console.log("Not validating ".concat(filter.label, " of type ").concat(filter.type));
    return true;
    /* eslint-disable */

    var selectable = validateAndOpenFilterSelectable(toolbar, filter);
    var filterDropDownToggle = toolbar.querySelector('.pf-c-select__toggle');

    _userEvent["default"].click(filterDropDownToggle);

    var selectMenu = toolbar.querySelector('.pf-c-select__menu');
    var randomIndex = Math.floor(Math.random() * filter.items.length);
    var testItem = (0, _dom.queryByText)(selectMenu, filter.items[randomIndex].label);
    var testChildItem = (0, _dom.queryByText)(selectMenu, filter.items[randomIndex].items[0].label);
    return selectable && !!filterDropDownToggle && !!selectMenu && !!testItem && !!testChildItem;
    /* eslint-enable */
  },
  checkbox: function checkbox(toolbar, filter) {
    var selectable = validateAndOpenFilterSelectable(toolbar, filter);
    var filterDropDownToggle = toolbar.querySelector('.pf-c-select__toggle');

    _userEvent["default"].click(filterDropDownToggle);

    var selectMenu = toolbar.querySelector('.pf-c-select__menu');
    var randomIndex = Math.floor(Math.random() * filter.items.length);
    var testItem = (0, _dom.queryByText)(selectMenu, filter.items[randomIndex].label);
    return selectable && !!filterDropDownToggle && !!selectMenu && !!testItem;
  },
  radio: function radio(toolbar, filter) {
    var selectable = validateAndOpenFilterSelectable(toolbar, filter);
    return selectable;
  },
  text: function text(toolbar, filter) {
    validateAndOpenFilterSelectable(toolbar, filter);
    var textInput = toolbar.querySelector("input");
    return !!textInput;
  }
};

var validateFilter = function validateFilter(container, filter, validator) {
  var toolbar = container.querySelector('#ins-primary-data-toolbar');
  return validator(toolbar, filter);
};

var filterHelpers = {
  toHaveFiltersFor: function toHaveFiltersFor(component, filters) {
    var pass = true;
    var currentFilter;
    var singleFilter = filters.length === 1;
    filters.every(function (filter) {
      var _render = (0, _react.render)(component),
          container = _render.container;

      currentFilter = filter;

      if (!singleFilter) {
        toggleFilterDropDown(container);
      }

      var validator = filterValidations[filter.type];

      if (validator) {
        var filterValidation = validateFilter(container, filter, validator);
        pass = filterValidation;
        return pass;
      } else {
        console.log("No test validator for ".concat(filter.label, " of type ").concat(filter.type));
        return true;
      }
    });
    return {
      message: function message() {
        return "No filter rendered for ".concat(currentFilter.label, " of type ").concat(currentFilter.type);
      },
      pass: pass
    };
  }
};
exports.filterHelpers = filterHelpers;