import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useErrorHandler } from 'react-error-boundary';

import Content from '../components/Content';
import Input from '../components/Input';
import Button from '../components/Button';
import PageMeta from '../components/PageMeta';

import useUser from '../hook/useUser';
import withUser from '../hoc/withUser';
import { useSignInMutation } from '../store';

type FormPayload = {
  login: string;
  password: string;
};

const inputs = [
  {
    name: 'login',
    label: 'Login',
    pattern: {
      value: /^[a-z0-9_-]{3,15}$/,
      message: 'Login is invalid',
    },
    required: true,
    autoComplete: 'username',
  },
  {
    name: 'password',
    label: 'Password',
    pattern: {
      value: /^[a-zA-Z0-9_-]{3,15}$/,
      message: 'Password is invalid',
    },
    required: true,
    type: 'password',
    autoComplete: 'current-password',
  },
];

function SignInPage() {
  const errorHandler = useErrorHandler();
  const navigate = useNavigate();
  const userData = useUser();
  const [signIn] = useSignInMutation();
  const { control, handleSubmit } = useForm<FormPayload>({
    defaultValues: {
      login: '',
      password: '',
    },
  });

  useEffect(() => {
    if (userData) {
      navigate('/');
    }
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await signIn(data);
      navigate('/');
    } catch ({ status, data: { reason } }) {
      errorHandler(new Error(`${status}: ${reason}`));
    }
  });
  return (
    <>
      <PageMeta
        title="Sign In"
        description="Sign In page"
      />
      <Content heading="Sign In" className="h-[calc(100vh_-_184px)] w-full flex">
        <div className="rounded-3xl bg-gray-100 w-[445px] p-8 m-auto bg-orange-200 dark:bg-[#374251]">
          <h2 className="text-center text-gray-800 dark:text-white">Sign in to your account</h2>
          <form onSubmit={onSubmit} className="grid mt-8 text-gray-800 dark:text-white">
            {inputs.map((input) => (
              <Controller
                key={input.name}
                name={input.name as keyof FormPayload}
                rules={{
                  pattern: input.pattern,
                  required: input.required,
                }}
                control={control}
                render={({ field, fieldState }) => (
                  <Input
                    {...field}
                    {...input}
                    errorText={fieldState.error?.message}
                  />
                )}
              />
            ))}
            <Button
              className="mt-4 mb-16 btn-orange-filled dark:btn-green-filled"
            >
              <span>Sign In</span>
            </Button>
          </form>
        </div>
      </Content>
    </>
  );
}

export default withUser(SignInPage, false);
