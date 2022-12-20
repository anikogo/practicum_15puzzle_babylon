/* eslint-disable react/button-has-type */
/* eslint-disable @typescript-eslint/naming-convention */
import { useMemo, useState, FormEvent } from 'react';
import {
  useTable,
  usePagination, useSortBy, useFlexLayout,
} from 'react-table';

import { Link } from 'react-router-dom';
import { useErrorHandler } from 'react-error-boundary';
import { useSelector } from 'react-redux';

import type {
  Row,
  Column,
  CellProps,
  TableInstance,
} from 'react-table';

import { SortAscendingIcon, SortDescendingIcon } from '@heroicons/react/solid';
import { selectCurrentUser } from '../../store/slices/userSlice';

import Pagination from '../Pagination';
import PopupEditTopicModal from '../PopupEditTopicModal';

import { usePostTopicMutation } from '../../store';
import useFormWithValidation from '../../hook/useValidator';

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

function NameCell({ row }:
CellProps<User &
{ title: string, category: string, content: string }>) { // date: Date,
  const {
    original: {
      id,
      title,
      content,
      category,
    },
  } = row;

  return (
    <div className="flex items-center">
      <div className="flex items-center h-10 w-20">
        <div className="text-sm font-medium text-gray-900">{category}</div>
      </div>

      <div className="ml-4">
        <div className="text-sm font-medium text-gray-900">
          <Link to={`${id}`}>{title}</Link>
        </div>
        <div className="text-sm text-gray-500">
          { content.length < 80 ? content : `${content.substring(0, 80)}...` }
        </div>
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

export default function Forum({ users }: { users:
(User & { title: string, category: string, content: string })[] }) {
  const data = useMemo(() => users, [users]);
  const [openEditPopup, setOpenEditPopup] = useState(false);
  const [addTopic] = usePostTopicMutation();
  const errorHandler = useErrorHandler();
  const { values, handleChange }: any = useFormWithValidation(); // IValid
  const currentUser = useSelector(selectCurrentUser);
  const columns = useMemo<Column<User &
  { title: string, category: string, content: string }>[]>(() => [
    {
      accessor: 'title',
      Header: 'Topics',
      Cell: NameCell,
      disableSortBy: true,
      width: 800,
    },
  ], []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    ...paginationProps
  } = useTable<User &
  { title: string, category: string, content: string }>( // date: Date,
    {
      columns,
      data,
    },
    useFlexLayout,
    useSortBy,
    usePagination,
  ) as TableTypeWorkaround<User &
  { title: string, category: string, content: string }>; // date: Date,

  const handlerAddTopic = async (e: FormEvent) => {
    e.preventDefault();

    const { title, category, content } = values;

    if (title && title !== '' && category && category !== '' && content && content !== '') {
      const body = {
        title,
        category,
        content,
        created_by: currentUser?.id,
      };

      try {
        await addTopic(body);
        setOpenEditPopup(false);
        values.title = '';
        values.category = '';
        values.content = '';
      } catch ({ status, data: { reason } }) {
        errorHandler(new Error(`${status}: ${reason}`));
      }
    }
  };

  const handlerTogglePopup = () => {
    setOpenEditPopup(!openEditPopup);
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="py-3 hidden sm:flex sm:items-center w-full">
          <div className="flex w-full gap-x-2 justify-between items-center">
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
              <button
                className="btn hover:text-gray-500 bg-green-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
                type="button"
                onClick={handlerTogglePopup}
              >
                Add topic
              </button>
            </nav>
          </div>
        </div>
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
      <PopupEditTopicModal
        openEditPopup={openEditPopup}
        handlerCloseEditPopup={handlerTogglePopup}
        handlerSubmit={handlerAddTopic}
        handleChange={handleChange}
        values={values}
        topic={{}}
      />
    </>
  );
}
