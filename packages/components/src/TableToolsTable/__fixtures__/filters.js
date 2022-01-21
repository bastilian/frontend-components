"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.exampleFilters = void 0;
var exampleFilters = [{
  type: 'text',
  label: 'Name',
  filterString: function filterString(value) {
    return "name ~ ".concat(value);
  }
}, {
  type: 'checkbox',
  label: 'Compliant',
  filterString: function filterString(value) {
    return "compliant = ".concat(value);
  },
  items: [{
    label: 'Compliant',
    value: 'true'
  }, {
    label: 'Non-compliant',
    value: 'false'
  }]
}, {
  type: 'checkbox',
  label: 'Systems meeting compliance',
  filterString: function filterString(value) {
    var scoreRange = value.split('-');
    return "compliance_score >= ".concat(scoreRange[0], " and compliance_score <= ").concat(scoreRange[1]);
  },
  items: [{
    label: '90 - 100%',
    value: '90-100'
  }, {
    label: '70 - 89%',
    value: '70-89'
  }, {
    label: '50 - 69%',
    value: '50-69'
  }, {
    label: 'Less than 50%',
    value: '0-49'
  }]
}];
exports.exampleFilters = exampleFilters;
var _default = [{
  type: 'text',
  label: 'Name',
  filter: function filter(items, value) {
    return items.filter(function (item) {
      return item === null || item === void 0 ? void 0 : item.name.includes(value);
    });
  }
}, {
  type: 'hidden',
  label: 'Hidden filter',
  filter: function filter(items) {
    return items;
  }
}, {
  type: 'checkbox',
  label: 'Checkbox Filter',
  items: ['OPTION 1', 'OPTION 2', 'OPTION 3'].map(function (option) {
    return {
      label: option,
      value: option
    };
  }),
  filter: function filter(items) {
    return items;
  }
}, {
  type: 'radio',
  label: 'Radio Filter',
  items: ['OPTION 1', 'OPTION 2', 'OPTION 3'].map(function (option) {
    return {
      label: option,
      value: option
    };
  }),
  filter: function filter(items) {
    return items;
  }
}, {
  type: 'UNKNOWNTYPE',
  label: 'Invalid Filter',
  items: ['OPTION 1', 'OPTION 2', 'OPTION 3'].map(function (option) {
    return {
      label: option,
      value: option
    };
  }),
  filter: function filter(items) {
    return items;
  }
}, {
  type: 'group',
  label: 'Filter group',
  items: [{
    label: 'Parent 1',
    value: 1,
    items: [{
      label: 'Child 1',
      value: 1
    }, {
      label: 'Child 2',
      value: 2
    }]
  }, {
    label: 'Parent 2',
    value: 2,
    items: [{
      label: 'Parent 2 Child 1',
      value: 1
    }, {
      label: 'Parent 2 Child 2',
      value: 2
    }]
  }],
  filter: function filter() {
    return [];
  }
}];
exports["default"] = _default;