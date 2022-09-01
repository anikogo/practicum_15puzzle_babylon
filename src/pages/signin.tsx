import { useForm, Controller } from 'react-hook-form';

import Content from '../components/Content';
import Input from '../components/Input';
import Button from '../components/Button';

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
    autoComplete: 'password',
  },
];

export default function SignInPage() {
  const { control, handleSubmit } = useForm<FormPayload>({
    defaultValues: {
      login: '',
      password: '',
    },
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });
  return (
    <Content heading="Sign In" className="h-[calc(100vh_-_128px)] w-full flex">
      <div className="rounded-3xl bg-gray-100 w-[445px] p-8 m-auto">
        <h2 className="text-center">Sign in to your account</h2>
        <form onSubmit={onSubmit} className="grid">
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
            variant="filled"
            color="green"
            className="mt-4 mb-16"
          >
            <span>Sign In</span>
          </Button>
        </form>
      </div>
    </Content>
  );
}
