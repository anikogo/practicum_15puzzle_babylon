import classnames from 'classnames';

type OwnProps = {
  src?: string;
  firstName: string;
  secondName: string;
  className?: string;
};

export default function Avatar({
  className = '',
  src,
  firstName,
  secondName,
}: OwnProps) {
  const initials = firstName[0] + secondName[0];
  return (
    <div
      className={classnames(
        'flex items-center justify-center overflow-hidden bg-gray-100 rounded-full relative w-1/2 aspect-square',
        className,
      )}
    >
      {src
        ? <img crossOrigin="anonymous" src={src} alt={`${firstName} ${secondName}`} className="m-0" />
        : <span className="uppercase">{initials}</span>}
    </div>
  );
}
