import { Spinner } from './Spinner';

interface ButtonProps {
  children: React.ReactNode;
  compact?: boolean;
  slate?: boolean;
  loading?: boolean;
  type?: 'button' | 'reset' | 'submit';
}

export const Button = ({ children, compact, slate, loading, type }: ButtonProps): JSX.Element => {
  const height = compact ? 'h-10' : 'h-12';
  const margin = compact ? 'my-1' : 'my-2';

  const background = slate ? 'bg-slate-600' : 'bg-zinc-200';
  const textColor = slate ? 'text-neutral-50' : '';

  const child = loading ? (
    <div className="m-auto w-6 h-6">
      <Spinner />
    </div>
  ) : (
    children
  );

  const style = `w-full ${height} px-3 ${background} rounded-md border border-zinc-300 shadow-md ${margin} text-sm ${textColor} tracking-wider transition-all duration-75 active:border-slate-400 active:shadow-sm`;
  return (
    <button className={style} type={type}>
      {child}
    </button>
  );
};
