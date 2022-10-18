/* eslint-disable no-param-reassign */
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useErrorHandler } from 'react-error-boundary';
import { useSelector } from 'react-redux';

import IComment from '../Comment/IComment';
import ITopic from './ITopic';
import { selectCurrentUser } from '../../store/slices/userSlice';

import TopicComment from '../Comment';
import Avatar from '../Avatar/index';
import PopupModal from '../PopupModal';
import PopupEditTopicModal from '../PopupEditTopicModal';

import dateTimeFormat from '../../utils/dateTimeFormat';

import {
  useDeleteTopicMutation,
  usePatchTopicMutation,
  usePostCommentMutation,
  useGetUsersInfoQuery,
} from '../../store';
import useFormWithValidation from '../../hook/useValidator';

function Topic({ data } : { data: ITopic }) {
  const [topic, setTopic] = useState(data);
  const [openEditPopup, setOpenEditPopup] = useState(false);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);

  const [deleteTopic] = useDeleteTopicMutation();
  const [editTopic] = usePatchTopicMutation();
  const [addComment] = usePostCommentMutation();

  const navigate = useNavigate();
  const errorHandler = useErrorHandler();
  const currentUser = useSelector(selectCurrentUser);
  const user = useGetUsersInfoQuery(topic.created_by);

  const { values, handleChange }:
  { values: Record<string, string>, handleChange:
  (event: React.ChangeEvent<HTMLInputElement>) => void } = useFormWithValidation();

  const handlerAddComment = async (e: FormEvent) => {
    e.preventDefault();

    if (values.comment !== '') {
      try {
        const result: unknown = await addComment({
          content: values.comment,
          topicId: topic.id,
          parentId: null,
          userId: currentUser?.id,
        });

        const comments = [...topic.comments];
        comments.push((result as { data: IComment })?.data);
        setTopic({ ...topic, comments });

        values.comment = '';
      } catch ({ status, data: { reason } }) {
        errorHandler(new Error(`${status}: ${reason}`));
      }
    }
  };

  const handlerEdit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const result: unknown = await editTopic({
        id: topic.id,
        title: values.title,
        category: values.category,
        content: values.content,
      });

      const { title, category, content } = (result as { data: ITopic }).data;

      setTopic({
        ...topic,
        title,
        category,
        content,
      });
      setOpenEditPopup(false);
    } catch ({ status, data: { reason } }) {
      errorHandler(new Error(`${status}: ${reason}`));
    }
  };

  const handlerDelete = async () => {
    try {
      await deleteTopic(topic.id);
      navigate('/forum');
    } catch ({ status, data: { reason } }) {
      errorHandler(new Error(`${status}: ${reason}`));
    }

    setOpenDeletePopup(false);
  };

  const handlerOpenEditPopup = () => {
    setOpenEditPopup(true);
  };

  const handlerOpenDeletePopup = () => {
    setOpenDeletePopup(true);
  };

  const handlerClosePopup = () => {
    setOpenEditPopup(false);
    setOpenDeletePopup(false);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="w-full mx-auto px-4 sm:px-6 py-6 bg-gray-100 sm:rounded-lg">
        <h2 className="relative z-0 inline-flex min-w-full border-b pt-6 pb-4">
          <span className="relative z-0 inline-flex text-gray-500">
            { `${topic.category}` }
            <svg
              className="w-6 h-6 mt-auto mb-auto mr-2 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </span>
          {topic.title}
        </h2>

        <div className="mt-4 inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            onClick={handlerOpenEditPopup}
            className="py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-l-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={handlerOpenDeletePopup}
            className="py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-r-md border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
          >
            Delete
          </button>
        </div>
        <p className="my-4 text-left whitespace-normal">{topic.content}</p>
        <div className="py-3 hidden sm:flex sm:items-center w-full border-t pt-6">
          <div className="flex w-full gap-x-2 justify-between items-center">
            <div className="flex h-10 w-20">
              <div className="flex items-center gap-x-2">
                <Avatar
                  src={topic.avatar ? topic.avatar : 'https://robohash.org/velitautemid.png?size=50x50&set=set1'}
                  firstName="firstName"
                  secondName="secondName"
                  className="flex-shrink-0 h-10 w-10"
                />
                <div className="w-[250px]">
                  <p className="text-sm text-gray-500">{ user?.data?.login }</p>
                  <p className="text-sm text-gray-500">{ dateTimeFormat(topic.createdAt) }</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h2 className="py-3">Comments</h2>
      <div>
        {topic.comments
          .filter((x: IComment) => x.parentId === null)
          .map((comment: IComment) => (
            <TopicComment
              key={comment.id}
              comment={comment}
              setTopic={setTopic}
              topic={topic}
            />
          ))}
      </div>
      <div className="py-3 hidden sm:flex sm:items-center w-full">
        <form
          className="flex w-full gap-x-2 justify-between items-center"
          onSubmit={handlerAddComment}
        >
          <div className="w-full">
            <div className="relative w-full z-0 inline-flex rounded-md shadow-sm -space-x-px pb-0">
              <input
                name="comment"
                value={values.comment || ''}
                onChange={handleChange}
                type="text"
                className="btn w-full hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
              />
            </div>
          </div>
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
            <button
              className="btn hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset"
              type="submit"
            >
              Add comment
            </button>
          </nav>
        </form>
      </div>
      <PopupModal
        openDeletePopup={openDeletePopup}
        handlerCloseDeletePopup={handlerClosePopup}
        handlerDelete={handlerDelete}
      />
      <PopupEditTopicModal
        openEditPopup={openEditPopup}
        handlerCloseEditPopup={handlerClosePopup}
        handlerSubmit={handlerAddComment}
        handleChange={handleChange}
        values={values}
        topic={topic}
      />
      <PopupEditTopicModal
        openEditPopup={openEditPopup}
        handlerCloseEditPopup={handlerClosePopup}
        handlerSubmit={handlerEdit}
        handleChange={handleChange}
        values={values}
        topic={topic}
      />
    </div>
  );
}

export default Topic;
