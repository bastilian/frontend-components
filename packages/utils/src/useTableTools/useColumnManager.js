import React, { useState } from 'react';
import ColumnManager from '@redhat-cloud-services/frontend-components/ColumnManager';

const filterColumnsBySelected = (columns, selected) => columns.filter((column) => selected.includes(column.title));

const useColumnManager = (columns = [], options = {}) => {
  const managableColumns = columns
    .map((column) => (column?.managable === undefined ? { ...column, managable: true } : column))
    .filter((column) => column.managable === true);
  // TODO If there would be a hook to manage generic "selections", from the useBulkSelect, this could be used here
  const [selectedColumns, setSelectedColumns] = useState(columns.map(({ title }) => title));
  const [isManagerOpen, setIsManagerOpen] = useState(false);
  const { manageColumns: enableColumnManager } = options;
  const onClick = () => {
    setIsManagerOpen(true);
  };

  const onSave = (newSelectedColumns) => {
    setSelectedColumns(newSelectedColumns);
    setIsManagerOpen(false);
  };

  return enableColumnManager
    ? {
        columns: filterColumnsBySelected(columns, selectedColumns),
        columnManagerAction: {
          label: 'Manage columns',
          onClick,
        },
        ColumnManager: () => ( // eslint-disable-line
          <ColumnManager
            columns={managableColumns}
            isOpen={isManagerOpen}
            onClose={() => setIsManagerOpen(false)}
            selectedColumns={selectedColumns}
            onSave={onSave}
          />
        ),
      }
    : { columns };
};

export default useColumnManager;
