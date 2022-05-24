import { Spinner } from './Spinner';

interface ButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  compact?: boolean;
  slate?: boolean;
  loading?: boolean;
  type?: 'button' | 'reset' | 'submit';
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button = (props: ButtonProps): JSX.Element => {
  const { children, disabled = false, compact, slate, loading, ...rest } = props;

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

  const style = `w-full ${height} px-3 ${background} rounded-md border border-zinc-300 shadow-md text-lg ${textColor} tracking-wider transition-all duration-75 active:border-slate-400 active:shadow-sm disabled:bg-slate-400 disabled:shadow-sm disabled:border-zinc-300 disabled:transition-none`;
  return (
    <button disabled={disabled} className={style} {...rest}>
      {child}
    </button>
  );
};
