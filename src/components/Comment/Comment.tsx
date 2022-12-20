/* eslint-disable @typescript-eslint/naming-convention */
import { FormEvent, useState, useEffect } from 'react';
import { useErrorHandler } from 'react-error-boundary';
import { useSelector } from 'react-redux';

import Avatar from '../Avatar';
import PopupModal from '../PopupModal';
import PopupEditCommentModal from '../PopupEditCommentModal';
import dateTimeFormat from '../../utils/dateTimeFormat';
import { selectCurrentUser } from '../../store/slices/userSlice';

import {
  useDeleteCommentMutation,
  useDeleteLikeMutation,
  usePatchCommentMutation,
  usePostLikeMutation,
  useGetLikesQuery,
  usePostCommentMutation,
  useGetUsersInfoQuery,
} from '../../store';

import useFormWithValidation from '../../hook/useValidator';

import ITopic from '../Topic/ITopic';
import IComment from './IComment';
import ILike from './ILike';

function TopicComment({ comment, setTopic, topic }:
{ comment: IComment, topic: ITopic, setTopic: any }) {
  const {
    id,
    content,
    createdAt,
    likes = [],
    userId,
    avatar = 'https://robohash.org/velitautemid.png?size=50x50&set=set1',
  } = comment;

  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [openEditPopup, setOpenEditPopup] = useState(false);
  const [openAddPopup, setOpenAddPopup] = useState(false);

  const { data } = useGetLikesQuery({ comment_id: id });
  const user = useGetUsersInfoQuery(userId);

  const [addLike] = usePostLikeMutation();
  const [deleteLike] = useDeleteLikeMutation();
  const [deleteComment] = useDeleteCommentMutation();
  const [editComment] = usePatchCommentMutation();
  const [addComment] = usePostCommentMutation();
  const errorHandler = useErrorHandler();
  const currentUser = useSelector(selectCurrentUser);

  const { values, handleChange }:
  { values: Record<string, string>, handleChange:
  (event: React.ChangeEvent<HTMLInputElement>) => void } = useFormWithValidation();

  const handlerAdd = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const result: unknown = await addComment({
        content: values.content,
        topicId: topic.id,
        parentId: id,
        userId: currentUser?.id,
      });

      // console.log(result);

      const comments = [...topic.comments];
      comments.push((result as { data: IComment })?.data);
      setTopic({ ...topic, comments });
      setOpenAddPopup(false);
      values.content = '';
    } catch ({ status, data: { reason } }) {
      errorHandler(new Error(`${status}: ${reason}`));
    }
  };

  useEffect(() => {
    values.content = comment.content || '';

    setTopic({
      ...topic,
      comments: topic.comments
        .map((x: IComment) => (x.id === id ? { ...x, likes: data } : x)),
    });
  }, [data]);

  const handlerEdit = async (e: FormEvent) => {
    e.preventDefault();

    const result = await editComment({ id, content: values.content });

    setTopic({
      ...topic,
      comments: topic.comments.map((x: IComment) => (x.id === id
        ? { ...x, content: (result as { data: IComment }).data.content } : x)),
    });

    setOpenEditPopup(false);
    values.content = '';
  };

  const handlerDelete = async () => {
    try {
      await deleteComment(id);

      setTopic({
        ...topic,
        comments: topic.comments.filter((x: IComment) => x.id !== id),
      });
      setOpenDeletePopup(false);
    } catch ({ status, data: { reason } }) {
      errorHandler(new Error(`${status}: ${reason}`));
    }
  };

  const handlerToggleAddPopup = () => {
    setOpenAddPopup(!openAddPopup);
  };

  const handlerToggleEditPopup = () => {
    setOpenEditPopup(!openEditPopup);
  };

  const handlerToggleDeletePopup = () => {
    setOpenDeletePopup(!openDeletePopup);
  };

  const handlerToggleLike = async () => {
    const user_id = currentUser?.id;
    const like = likes.filter((x: ILike) => x.user_id === user_id && x.comment_id === id);

    if (likes.some((x: ILike) => x.user_id === user_id && x.comment_id === id)) {
      await deleteLike(like[0].id);
      setTopic({
        ...topic,
        comments: topic.comments
          // eslint-disable-next-line max-len
          .map((x: IComment) => (x.id === id ? { ...x, likes: x.likes.filter((l) => l.id !== like[0].id) } : x)),
      });
    } else {
      const res = await addLike({ comment_id: id, user_id });
      setTopic({
        ...topic,
        comments: topic.comments
          .map((x: IComment) => (x.id === id ? { ...x, likes: [...x.likes, res] } : x)),
      });
    }
  };

  return (
    <div className="bg-white">
      <div className="bg-gray-50 sm:rounded-lg">
        <div className="w-full mx-auto px-4 sm:px-6 py-6 bg-gray-100 sm:rounded-lg">
          <p className="my-4 px-4 py-3 text-left whitespace-normal divide-y divide-gray-200">
            { content }
          </p>

          <div className="hidden sm:flex sm:items-center w-full border-t pt-6">
            <div className="flex w-full gap-x-2 justify-between items-center">
              <div className="flex items-center gap-x-2 px-4 py-1">
                <Avatar
                  src={avatar}
                  firstName="firstName"
                  secondName="secondName"
                  className="flex-shrink-0 h-8 w-8"
                />
                <div className="w-[250px]">
                  <p className="text-sm text-gray-500">{ user?.data?.login }</p>
                  <p className="text-sm text-gray-500">{ dateTimeFormat(createdAt) }</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="py-3 hidden sm:flex sm:items-center w-full">
          <div className="flex w-full gap-x-2 justify-between items-center">
            <div className="w-[150px]">
              <div className="relative">
                <button
                  type="button"
                  onClick={handlerToggleLike}
                  className="text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 mr-2 mb-2"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  <span
                    className="inline-flex justify-center items-center ml-2 w-4 h-4 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full"
                  >
                    {likes.length}
                  </span>
                </button>
              </div>
            </div>

            <nav className="relative z-0 inline-flex rounded-md -space-x-px gap-x-2">
              <button
                type="button"
                onClick={handlerToggleDeletePopup}
                className="w-[100px] btn hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset"
              >
                Delete
              </button>
              <button
                type="button"
                onClick={handlerToggleEditPopup}
                className="w-[100px] btn hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset"
              >
                Edit
              </button>
              <button
                type="submit"
                onClick={handlerToggleAddPopup}
                className="w-[100px] btn hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset"
              >
                Add
              </button>
            </nav>
          </div>
        </div>
        <div>
          {
            topic.comments
              .filter((x: IComment) => x.parentId === id)
              .map((com: IComment) => (
                <TopicComment
                  key={com.id}
                  comment={com}
                  setTopic={setTopic}
                  topic={topic}
                />
              ))
          }
        </div>
      </div>
      <PopupModal
        openDeletePopup={openDeletePopup}
        handlerCloseDeletePopup={handlerToggleDeletePopup}
        handlerDelete={handlerDelete}
      />
      <PopupEditCommentModal
        openEditPopup={openEditPopup}
        handlerCloseEditPopup={handlerToggleEditPopup}
        handleChange={handleChange}
        values={values}
        handlerEdit={handlerEdit}
      />
      <PopupEditCommentModal
        openEditPopup={openAddPopup}
        handlerCloseEditPopup={handlerToggleAddPopup}
        handleChange={handleChange}
        handlerEdit={handlerAdd}
        values={values}
      />
    </div>
  );
}

export default TopicComment;
