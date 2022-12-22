import { useState } from 'react';
import { useErrorHandler } from 'react-error-boundary';

import PageMeta from '../components/PageMeta';
import Content from '../components/Content';
import UserForm, { type FormPayload } from '../components/UserForm';
import Notification, { type NotificationProps } from '../components/Notification';
import withUser from '../hoc/withUser';
import useUser from '../hook/useUser';
import { useUpdateAvatarMutation, useUpdateUserMutation } from '../store';

function ProfilePage() {
  const errorHandler = useErrorHandler();
  const userData = useUser();
  const [updateUser] = useUpdateUserMutation();
  const [updateAvatar] = useUpdateAvatarMutation();
  const [notification, setNotification] = useState<{ type: NotificationProps['type']; message: string; } | null>(null);

  const onSubmit = (data: FormPayload) => {
    const actions = [];
    if (data.avatar && data.avatar !== userData?.avatar) {
      actions.push(updateAvatar(data.avatar));
    }
    actions.push(updateUser({
      ...data,
      display_name: `${data.first_name} ${data.second_name}`,
    }));
    Promise.all(actions)
      .then(() => setNotification({
        type: 'success',
        message: 'Profile updated',
      }))
      .then(() => setTimeout(() => setNotification(null), 3000))
      .catch(({ status, data: { reason } }) => errorHandler(new Error(`${status}: ${reason}`)));
  };

  return (
    <>
      <PageMeta
        title="Profile"
        description="User profile page"
      />
      <Content heading="Profile" className="min-h-[calc(100vh_-_184px)] w-full flex">
        <div className="bg-orange-200 dark:bg-[#374251] rounded-3xl bg-gray-100 w-max pt-4 pb-8 px-8 m-auto">
          <UserForm userData={userData} onSubmit={onSubmit} />
          {notification && (
            <Notification
              type={notification.type}
              className="mt-4 absolute w-[calc(100%-4rem)] bottom-4 left-0 ml-8"
            >
              <span>
                {notification.message}
              </span>
            </Notification>
          )}
        </div>
      </Content>
    </>
  );
}

export default withUser(ProfilePage);
