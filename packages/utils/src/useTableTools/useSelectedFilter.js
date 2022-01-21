import React from 'react';
import SelectedFilterSwitch from '@redhat-cloud-services/frontend-components/SelectedFilterSwitch';

// TODO Rethink general implementation of the "selected filter" switch
// Compliance uses this hook and there is probably no other app that ever will
// The hook should maybe be removed and better implemented separate from the table tool hooks
const useSelectedFilter = ({ setActiveFilter, activeFilters, selectedFilter }) => {
  const enableSelectedFilter = !!selectedFilter;
  const filterKey = 'selected';
  const filterItem = {
    type: 'hidden',
    label: 'selectFilter',
    key: filterKey,
    default: true,
    filter: (items, value) => {
      return items.filter((item) => item?.rowProps?.selected === value);
    },
  };
  const isChecked = activeFilters[filterKey] === true;
  const selectedToggle = (
    <SelectedFilterSwitch
      {...{
        setActiveFilter,
        isChecked,
      }}
    />
  );

  return enableSelectedFilter
    ? {
        filterItem,
        toolbarProps: {
          dedicatedAction: selectedToggle,
        },
      }
    : {};
};

export default useSelectedFilter;
