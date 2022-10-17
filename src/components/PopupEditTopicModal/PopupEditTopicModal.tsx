export default function PopupEditTopicModal(data: any) {
  const {
    openEditPopup,
    handlerCloseEditPopup,
    handlerSubmit,
    handleChange,
    values,
    topic,
  } = data;

  return (
    <div
      id="popup-modal"
      className={`${openEditPopup ? '' : 'hidden'} justify-center items-center flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full`}
      role="dialog"
    >
      <div className="relative p-4 w-full max-w-md h-full md:h-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
            data-modal-toggle="popup-modal"
            onClick={handlerCloseEditPopup}
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <form onSubmit={handlerSubmit} className="p-6 text-left">
            <div className="mb-6">
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label
                htmlFor="success"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Title
              </label>
              <input
                name="title"
                value={values.title ? values.title : topic.title || ''}
                onChange={handleChange}
                type="text"
                id="success"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Success input"
              />
            </div>
            <div className="mb-6">
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label
                htmlFor="success"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Category
              </label>
              <input
                name="category"
                value={values.category ? values.category : topic.category || ''}
                onChange={handleChange}
                type="text"
                id="success"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Success input"
              />
            </div>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
            >
              Content
            </label>
            <textarea
              name="content"
              value={values.content ? values.content : topic.content || ''}
              onChange={handleChange}
              id="message"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Your message..."
            />
            <button
              data-modal-toggle="popup-modal"
              type="submit"
              className="mt-4 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Save
            </button>
            <button
              type="button"
              onClick={handlerCloseEditPopup}
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
