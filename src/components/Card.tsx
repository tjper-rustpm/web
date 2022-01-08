interface CardProps {
  children: React.ReactNode;
  variant: 'compact' | 'standard';
}

export const Card = ({ children, variant = 'standard' }: CardProps): JSX.Element => {
  let style = 'bg-neutral-50 shadow-xl rounded-md w-[26rem] m-auto border-slate-200 border';

  switch (variant) {
    case 'compact':
      style = `${style} p-2`;
      break;
    case 'standard':
      style = `${style} p-5`;
      break;
  }

  return <div className={style}>{children}</div>;
};
