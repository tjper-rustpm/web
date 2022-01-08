import { Spinner } from './Spinner';

interface ButtonProps {
  children: React.ReactNode;
  compact?: boolean;
  slate?: boolean;
  loading?: boolean;
  type?: 'button' | 'reset' | 'submit';
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button = ({ children, compact, slate, loading, ...rest }: ButtonProps): JSX.Element => {
  const height = compact ? 'h-10' : 'h-12';

  const background = slate ? 'bg-slate-600' : 'bg-zinc-200';
  const textColor = slate ? 'text-neutral-50' : '';

  const child = loading ? (
    <div className="m-auto w-6 h-6">
      <Spinner />
    </div>
  ) : (
    children
  );

  const style = `w-full ${height} px-3 ${background} rounded-md border border-zinc-300 shadow-md text-sm ${textColor} tracking-wider transition-all duration-75 active:border-slate-400 active:shadow-sm`;
  return (
    <button className={style} {...rest}>
      {child}
    </button>
  );
};
