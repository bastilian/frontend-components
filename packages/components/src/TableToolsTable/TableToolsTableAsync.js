import React from 'react';
import propTypes from 'prop-types';
import { Pagination, PaginationVariant } from '@patternfly/react-core';
import { Table, TableBody, TableHeader } from '@patternfly/react-table';
import PrimaryToolbar from '../PrimaryToolbar';
import TableToolbar from '../TableToolbar';
import { useTableToolsAsync } from '@redhat-cloud-services/frontend-components-utilities/useTableTools';

const TableToolsTable = ({ getItems, columns = [], filters = [], options = {}, toolbarProps: toolbarPropsProp, ...tablePropsRest }) => {
  const { toolbarProps, tableProps, ColumnManager } = useTableToolsAsync(getItems, columns, {
    filters,
    toolbarProps: toolbarPropsProp,
    tableProps: tablePropsRest,
    ...options,
  });

  return (
    <React.Fragment>
      <PrimaryToolbar {...toolbarProps} />

      <Table {...tableProps}>
        <TableHeader />
        <TableBody />
      </Table>

      <TableToolbar isFooter>
        <Pagination variant={PaginationVariant.bottom} {...toolbarProps.pagination} />
      </TableToolbar>

      {ColumnManager && <ColumnManager />}
    </React.Fragment>
  );
};

TableToolsTable.propTypes = {
  getItems: propTypes.func.isRequired,
  columns: propTypes.arrayOf(
    propTypes.shape({
      title: propTypes.node,
      transforms: propTypes.array,
      sortByProperty: propTypes.string,
      sortByArray: propTypes.array,
      sortByFunction: propTypes.func,
      renderFunc: propTypes.func,
    })
  ).isRequired,
  filters: propTypes.object,
  options: propTypes.object,
  toolbarProps: propTypes.object,
};

export default TableToolsTable;
