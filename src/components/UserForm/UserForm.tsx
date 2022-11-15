import { Controller, useForm } from 'react-hook-form';
import Input from '../Input';
import Button from '../Button';
import AvatarChanger from '../AvatarChanger';

export type FormPayload = Omit<User, 'id'>;

type UserFormProps = {
  userData?: User | null;
  onSubmit: (data: FormPayload) => void;
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

export default function UserForm({ userData, onSubmit }: UserFormProps): JSX.Element {
  const { control, handleSubmit } = useForm<FormPayload>({
    defaultValues: userData ?? {
      avatar: '',
      first_name: '',
      second_name: '',
      login: '',
      email: '',
      password: '',
      phone: '',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-[445px] grid">
      <div className="grid my-4">
        <Controller
          control={control}
          name="avatar"
          render={({ field }) => (
            <AvatarChanger
              first_name={userData?.first_name ?? ' '}
              second_name={userData?.second_name ?? ' '}
              avatar={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
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
              <Input {...field} {...input} errorText={fieldState.error?.message} />
            )}
          />
        ))}
      </div>
      <Button variant="filled" color="green" className="mt-8">
        <span>{userData ? 'Update' : 'Sign up'}</span>
      </Button>
    </form>
  );
}
