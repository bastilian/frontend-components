import useFilterConfig from './useFilterConfig';
import useTableSort from './useTableSort';
import usePaginate from './usePaginate';
import useRowsLoader from './useRowsLoader';
import useBulkSelect from './useBulkSelect';
import useExpandable from './useExpandable';
import useDedicatedAction from './useDedicatedAction';
import useToolbarActions from './useToolbarActions';
import useColumnManager from './useColumnManager';
import useExport from './useExport';

const useTableTools = (getItems, columns = [], options = {}) => {
  const { toolbarProps: toolbarPropsOption, tableProps: tablePropsOption } = options;
  const { columnManagerAction, ColumnManager, columns: managedColumns } = useColumnManager(columns, options);

  const { toolbarProps: toolbarActionsProps } = useToolbarActions({
    ...options,
    actions: [...(options?.actions || []), ...((columnManagerAction && [columnManagerAction]) || [])],
  });

  const { toolbarProps: pagintionToolbarProps, pagination } = usePaginate(options);

  const {
    toolbarProps: conditionalFilterProps,
    selectedFilterToolbarProps,
    activeFilters: filters,
  } = useFilterConfig({
    ...options,
  });

  const { transformer: openItem, tableProps: expandableProps } = useExpandable(options);
  const { tableProps: sortableTableProps, sortableColumns, sortBy } = useTableSort(managedColumns, options);
  const { items, itemsCount } = useItemsLoader(getItems, pagination, filters, sortBy);

  const {
    transformer: selectItem,
    toolbarProps: bulkSelectToolbarProps,
    tableProps: bulkSelectTableProps,
  } = useBulkSelect({
    ...options,
  });

  const { toolbarProps: dedicatedActionToolbarProps } = useDedicatedAction({
    ...options,
    additionalDedicatedActions: selectedFilterToolbarProps?.dedicatedAction,
  });

  const { toolbarProps: exportToolbarProps } = useExport(managedColumns, options);

  const { toolbarProps: rowBuilderToolbarProps, tableProps: rowBuilderTableProps } = useRowsLoader(
    getItems,
    sortableColumns,
    { pagination, sortBy, filters },
    {
      emptyRows: options.emptyRows,
      transformer: [selectItem],
      rowTransformer: [openItem],
    }
  );

  const toolbarProps = {
    ...pagintionToolbarProps,
    ...bulkSelectToolbarProps,
    ...conditionalFilterProps,
    ...selectedFilterToolbarProps,
    ...dedicatedActionToolbarProps,
    ...rowBuilderToolbarProps,
    ...toolbarPropsOption,
    ...exportToolbarProps,
    ...toolbarActionsProps,
  };

  const tableProps = {
    cells: managedColumns,
    ...rowBuilderTableProps,
    ...sortableTableProps,
    ...bulkSelectTableProps,
    ...expandableProps,
    ...tablePropsOption,
  };

  return {
    toolbarProps,
    tableProps,
    ColumnManager,
  };
};

export default useTableTools;
