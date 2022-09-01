import { useForm, Controller } from 'react-hook-form';

import Input from '../components/Input';
import Button from '../components/Button';
import Content from '../components/Content';

type FormPayload = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

const inputs = [
  {
    name: 'first_name',
    label: 'First name',
    pattern: {
      value: /^[a-zA-Zа-яА-ЯёЁ-]{3,15}$/,
      message: 'First name is invalid',
    },
    required: true,
    autoComplete: 'given-name',
  },
  {
    name: 'second_name',
    label: 'Second name',
    pattern: {
      value: /^[a-zA-Zа-яА-ЯёЁ-]{3,15}$/,
      message: 'Second name is invalid',
    },
    required: true,
    autoComplete: 'family-name',
  },
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
    name: 'email',
    label: 'Email',
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Email is invalid',
    },
    required: true,
    autoComplete: 'email',
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
    autoComplete: 'new-password',
  },
  {
    name: 'phone',
    label: 'Phone',
    pattern: {
      value: /^\+?(\d{1})\(?(\d{3})\)?[-|\s]?(\d{3})[-|\s]?(\d{2})[-|\s]?(\d{2})$/,
      message: 'Phone is invalid',
    },
    required: true,
    autoComplete: 'tel',
  },
];

export default function SignUpPage() {
  const { control, handleSubmit } = useForm<FormPayload>({
    defaultValues: {
      first_name: '',
      second_name: '',
      login: '',
      email: '',
      password: '',
      phone: '',
    },
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });
  return (
    <Content heading="Sign Up" className="h-[calc(100vh_-_128px)] w-full flex">
      <div className="rounded-3xl bg-gray-100 w-max h-full p-8 m-auto">
        <h1 className="font-bold leading-tight  text-4xl text-center mb-6">Sign Up Page</h1>
        <form onSubmit={onSubmit} className="w-[445px] grid">
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
            <span>Sign up</span>
          </Button>
        </form>
      </div>
    </Content>
  );
}
