import { useMemo } from 'react';
import {
  useTable,
  usePagination,
  useSortBy,
  useFlexLayout,
  type Row,
  type Column,
  type CellProps,
  type TableInstance,
} from 'react-table';

import {
  SortAscendingIcon,
  SortDescendingIcon,
} from '@heroicons/react/solid';

import Pagination from '../Pagination';
import Avatar from '../Avatar';

// Required workaround for missing TypesScript definitions.
// Will be fixed in react-table v8
// see also https://github.com/tannerlinsley/react-table/issues/3064
// eslint-disable-next-line @typescript-eslint/ban-types
type TableTypeWorkaround<T extends Object> = TableInstance<T> & {
  page: Row<T>[];
  pageCount: number;
  pageOptions: number[];
  canPreviousPage: boolean;
  canNextPage: boolean;
  gotoPage: (updater: ((pageIndex: number) => number) | number) => void;
  previousPage: () => void;
  nextPage: () => void;
  setPageSize: (pageSize: number) => void;
  state: {
    pageIndex: number;
    pageSize: number;
  }
};

function NameCell({ row }: CellProps<User & { score: number }>) {
  const {
    original: {
      avatar,
      display_name: displayName,
      first_name: firstName,
      second_name: secondName,
      email,
    },
  } = row;
  return (
    <div className="flex items-center">
      <Avatar
        src={avatar}
        firstName={firstName}
        secondName={secondName}
        className="flex-shrink-0 h-10 w-10"
      />
      <div className="ml-4">
        <div className="text-sm font-medium text-gray-900">{displayName ?? `${firstName} ${secondName}`}</div>
        <div className="text-sm text-gray-500">{email}</div>
      </div>
    </div>
  );
}

type SortIconProps = {
  isSortedDesc: boolean;
};

function SortIcon({ isSortedDesc }: SortIconProps) {
  return isSortedDesc
    ? <SortDescendingIcon className="w-4 h-4 ml-4" />
    : <SortAscendingIcon className="w-4 h-4 ml-4" />;
}

export default function LeaderboardTable({ users }: { users: (User & { score: number; })[] }) {
  const data = useMemo(() => users, [users]);
  const columns = useMemo<Column<User & { score: number }>[]>(() => [
    {
      accessor: 'first_name',
      Header: 'Name',
      Cell: NameCell,
      disableSortBy: true,
      width: 350,
    },
    {
      Header: 'Login',
      accessor: 'login',
      width: 350,
    },
    {
      Header: 'Score',
      accessor: 'score',
      width: 150,
    },
  ], []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    ...paginationProps
  } = useTable<User & { score: number }>(
    {
      columns,
      data,
    },
    useFlexLayout,
    useSortBy,
    usePagination,
  ) as TableTypeWorkaround<User & { score: number }>;

  return (
    <>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <div className="min-w-full divide-y divide-gray-200 table-fixed" {...getTableProps()}>
                <div className="bg-gray-50">
                  {headerGroups.map((headerGroup) => (
                    <div {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <div
                          {...column.getHeaderProps(column.getSortByToggleProps())}
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          <div className="inline-flex">
                            {column.render('Header')}
                            {column.isSorted ? (
                              <SortIcon isSortedDesc={column.isSortedDesc ?? false} />
                            ) : (
                              <span className="w-4 h-4" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
                <div className="bg-white divide-y divide-gray-200" {...getTableBodyProps()}>
                  {page.map((row) => {
                    prepareRow(row);
                    return (
                      <div {...row.getRowProps()}>
                        {row.cells.map((cell) => (
                          <div className="px-6 py-3 whitespace-nowrap" {...cell.getCellProps()}>
                            <div className="flex items-center">
                              {cell.render('Cell')}
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Pagination {...paginationProps} />
    </>
  );
}
