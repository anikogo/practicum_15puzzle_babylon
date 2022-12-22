import {
  useCallback,
  useRef,
  useState,
  type ChangeEvent,
} from 'react';
import classnames from 'classnames';
import Avatar from '../Avatar';

type AvatarChangerProps = Pick<User, 'first_name' | 'second_name' | 'avatar'> & {
  onChange: (formData: FormData) => void;
};
export default function AvatarChanger({ onChange, ...user }: AvatarChangerProps) {
  const elementInputFile = useRef<HTMLInputElement>(null);
  const [newSrc, setNewSrc] = useState('');

  const validateImgFile = (file: File | undefined) => !!file?.type.match('image.*');

  const onInputChange = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    const { files } = evt.target;
    if (!files?.[0]) {
      return;
    }
    if (!validateImgFile(files[0])) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      setNewSrc(e.target?.result as string);
    };
    reader.readAsDataURL(files[0]);

    const form = new FormData();
    form.append('avatar', files[0]);

    onChange(form);
  }, []);

  const {
    avatar,
    first_name: firstName,
    second_name: secondName,
  } = user;

  return (
    <label
      className={classnames(
        'rounded-xl p-4 flex flex-col justify-between h-full relative',
      )}
      htmlFor="avatar"
    >
      <Avatar
        src={newSrc || avatar}
        firstName={firstName}
        secondName={secondName}
        className="self-center text-7xl border-4 border-transparents hover:border-gray-700 dark:hover:border-green-700 hover:cursor-pointer"
      />
      <input
        ref={elementInputFile}
        type="file"
        onChange={onInputChange}
        id="avatar"
        className={classnames(
          'visually-hidden',
        )}
      />
    </label>
  );
}
