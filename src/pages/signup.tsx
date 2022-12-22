import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useErrorHandler } from 'react-error-boundary';

import Content from '../components/Content';
import PageMeta from '../components/PageMeta';
import UserForm, { type FormPayload } from '../components/UserForm';

import useUser from '../hook/useUser';
import withUser from '../hoc/withUser';
import { useSignUpMutation, useUpdateAvatarMutation } from '../store';

function SignUpPage() {
  const errorHandler = useErrorHandler();
  const navigate = useNavigate();
  const userData = useUser();
  const [signUp] = useSignUpMutation();
  const [updateAvatar] = useUpdateAvatarMutation();

  useEffect(() => {
    if (userData) {
      navigate('/');
    }
  });

  const onSubmit = (data: FormPayload) => {
    signUp(data)
      .then(() => updateAvatar(data.avatar))
      .then(() => navigate('/'))
      .catch(({ status, data: { reason } }) => errorHandler(new Error(`${status}: ${reason}`)));
  };

  return (
    <>
      <PageMeta
        title="Sign Up"
        description="Sign Up page"
      />
      <Content heading="Sign Up" className="h-[calc(100vh_-_184px)] w-full flex">
        <div className="bg-orange-200 dark:bg-[#374251] rounded-3xl w-max pt-4 pb-8 px-8 m-auto">
          <h2 className="text-center text-gray-800 dark:text-white">Creane new account</h2>
          <UserForm onSubmit={onSubmit} />
        </div>
      </Content>
    </>
  );
}

export default withUser(SignUpPage, false);
