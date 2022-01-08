interface CardProps {
  children: React.ReactNode;
  variant: 'compact' | 'standard';
}

export const Card = ({ children, variant = 'standard' }: CardProps): JSX.Element => {
  let style = 'm-auto bg-neutral-50 shadow-xl rounded-md max-w-lg border-slate-200 border';

  switch (variant) {
    case 'compact':
      style = `${style} p-3`;
      break;
    case 'standard':
      style = `${style} p-5`;
      break;
  }

  return <div className={style}>{children}</div>;
};
