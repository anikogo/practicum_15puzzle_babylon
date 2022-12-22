import { forwardRef, type InputHTMLAttributes } from 'react';
import classnames from 'classnames';

type OwnProps = {
  id?: string;
  label?: string;
  errorText?: string;
  className?: string;
};

export type InputProps = OwnProps & Omit<InputHTMLAttributes<HTMLInputElement>, 'pattern'>;

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    errorText = '',
    type,
    className = '',
    onChange,
    label,
    id,
    value,
  } = props;
  return (
    <div className={classnames('grid relative')}>
      {label && <label htmlFor={id} className={classnames('mb-1')}>{label}</label>}
      <input
        ref={ref}
        onChange={onChange}
        type={type}
        value={value}
        className={classnames(
          className,
          'rounded border border-[#E1E1E1] w-auto py-2 px-4 text-grey-800',
          { 'border-error': errorText },
        )}
      />
      {
        errorText
        && <span className={classnames('absolute inset-x-0 bottom-0 text-error m-0 text-center')}>{ errorText }</span>
      }
    </div>
  );
});

export default Input;
