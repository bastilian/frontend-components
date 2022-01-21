import React from 'react';
import { renderJson } from '../../../utils/src/useTableTools/testHelpers';
import SelectedFilterSwitch from './SelectedFilterSwitch';

describe('SelectedFilterSwitch', () => {
  it('expect to render without error', () => {
    const component = <SelectedFilterSwitch />;

    expect(renderJson(component)).toMatchSnapshot();
  });

  it('expect to render without error', () => {
    const component = <SelectedFilterSwitch isChecked={false} />;

    expect(renderJson(component)).toMatchSnapshot();
  });
});
