import React from 'react';
import columns from '../TableToolsTable/__fixtures__/columns';
import { renderJson } from '../TableToolsTable/testHelpers';
import ColumnManager from './ColumnManager';

describe('ColumnManager', () => {
  it('expect to render without error', () => {
    expect(renderJson(<ColumnManager columns={columns} />)).toMatchSnapshot();
  });
});
