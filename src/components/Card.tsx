interface CardProps {
  children: React.ReactNode;
  size?: 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  variant?: 'compact' | 'standard';
}

export const Card = ({ children, variant = 'standard', size = 'lg' }: CardProps): JSX.Element => {
  let style = 'm-auto bg-neutral-50 shadow-xl rounded-md border-slate-200 border';

  switch (variant) {
    case 'compact':
      style = `${style} p-3`;
      break;
    case 'standard':
      style = `${style} p-5`;
      break;
  }

  switch (size) {
    case 'md':
      style = `${style} max-w-md`;
      break;
    case 'lg':
      style = `${style} max-w-lg`;
      break;
    case 'xl':
      style = `${style} max-w-xl`;
      break;
    case '2xl':
      style = `${style} max-w-2xl`;
      break;
    case '3xl':
      style = `${style} max-w-3xl`;
      break;
    case '4xl':
      style = `${style} max-w-4xl`;
      break;
  }

  return <div className={style}>{children}</div>;
};
