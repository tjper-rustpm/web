interface ButtonProps {
  children: React.ReactNode;
  compact?: boolean;
  slate?: boolean;
}

export const Button = ({ children, compact, slate }: ButtonProps): JSX.Element => {
  const height = compact ? 'h-10' : 'h-12';
  const margin = compact ? 'my-1' : 'my-2';

  const background = slate ? 'bg-slate-600' : 'bg-zinc-200';
  const textColor = slate ? 'text-neutral-50' : '';

  const style = `inline w-full ${height} ${background} rounded-md border border-zinc-300 shadow-md ${margin} text-md ${textColor} tracking-wider transition-all duration-75 active:border-slate-400 active:shadow-sm`;
  return <button className={style}>{children}</button>;
};
