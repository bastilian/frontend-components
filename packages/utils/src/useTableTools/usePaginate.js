import { useState } from 'react';

const usePaginate = (options = {}) => {
  const { perPage = 10, page = 1, itemsCount = 0 } = options;
  const enablePagination = options?.pagination !== false;

  const [paginationState, setPaginationState] = useState({
    itemCount: totalItemsCount,
    perPage,
    page,
  });
  const setPagination = (newState) =>
    setPaginationState({
      ...paginationState,
      ...newState,
    });

  const onSetPage = (_, page) => setPagination({ ...paginationState, page });

  const onPerPageSelect = (_, perPage) => setPagination({ ...paginationState, page: 1, perPage });

  const setPage = (page) => {
    const nextPage = page < 0 ? paginationState.page + page : page;
    setPagination({
      ...paginationState,
      page: nextPage > 0 ? nextPage : 1,
    });
  };

  return enablePagination
    ? {
        pagination: paginationState,
        setPage,
        toolbarProps: {
          pagination: {
            ...paginationState,
            onSetPage,
            onPerPageSelect,
          },
        },
      }
    : {};
};

export default usePaginate;
