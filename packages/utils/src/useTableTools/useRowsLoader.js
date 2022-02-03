import React, { useEffect, useState } from 'react';
import { NoResultsTable } from '@redhat-cloud-services/frontend-components/TableToolsTable/NoResultsTable';

const emptyRows = [
  {
    cells: [
      {
        title: () => <NoResultsTable />, // eslint-disable-line react/display-name
        props: {
          colSpan: 3,
        },
      },
    ],
  },
];

const columnProp = (column) => column.key || column.original?.toLowerCase() || column.title?.toLowerCase();

const itemRow = (item, columns) => ({
  ...item.rowProps,
  itemId: item.itemId,
  cells: columns.map((column) => ({
    title: column.renderFunc ? column.renderFunc(undefined, undefined, item) : item[columnProp(column)],
  })),
});

const primeItem = (item, transformers) => {
  let newItem = item;

  transformers.forEach((transformer) => {
    if (transformer) {
      newItem = transformer(newItem);
    }
  });

  return newItem;
};

const applyTransformers = (items, transformers = []) => items.map((item) => primeItem(item, transformers));

const buildRow = (item, columns, rowTransformer, idx) =>
  rowTransformer.flatMap((transformer) => {
    const row = itemRow(item, columns);
    return transformer ? transformer(row, item, columns, idx) : row;
  });

const useRowsLoader = (getItems, columns, tableParams, options = {}) => {
  const { transformer = [], rowTransformer = [] } = options;
  const EmptyRowsComponent = options.emptyRows || emptyRows;
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [totalItemsCount, setTotalItemsCount] = useState(0);
  // const transformedItems = transformer ? applyTransformers(items, transformer) : items;

  const rows =
    totalItemsCount > 0 ? items.flatMap((item, idx) => buildRow(item, columns, rowTransformer, idx)).filter((v) => !!v) : EmptyRowsComponent;

  const pagination = options?.pagination
    ? {
        ...options.pagination,
        itemCount: totalItemsCount,
      }
    : undefined;

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      await getItems(tableParams);
    };

    fetchItems()
      .then(({ items, totalItemsCount }) => {
        setItems(items);
        setTotalItemsCount(totalItemsCount);
      })
      .then(() => {
        setLoading(false);
      })
      .catch(console.error);
  }, [tableParams?.pagination, tableParams?.sortBy, tableParams?.filter]);

  return {
    tableProps: {
      rows,
    },
    toolbarProps: {
      pagination,
    },
  };
};

export default useRowsLoader;
