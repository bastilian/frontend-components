"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _items = require("./items");

var _default = [{
  title: 'ID',
  sortByProperty: 'id',
  exportKey: 'id'
}, {
  title: 'Name',
  sortByProperty: 'name',
  exportKey: 'name',
  renderFunc: function renderFunc(_a, _b, item) {
    return item.name;
  }
}, {
  title: 'Another Name column',
  sortByProperty: 'name',
  exportKey: 'name',
  renderExport: function renderExport(name) {
    return "".concat(name, " via export render");
  }
}, {
  title: 'Description',
  sortByProperty: 'description',
  renderExport: function renderExport(item) {
    return "".concat(item.name, " description rendered for export");
  }
}, {
  title: 'Severity sorted by function',
  sortByFunction: function sortByFunction(item) {
    return item.name;
  },
  exportKey: 'severity',
  renderFunc: function renderFunc(_a, _b, item) {
    return item.severity;
  }
}, {
  title: 'Severity by Array',
  sortByProperty: 'severity',
  sortByArray: _items.severityLevels,
  exportKey: 'severity',
  renderFunc: function renderFunc(_a, _b, item) {
    return item.severity;
  }
}];
exports["default"] = _default;