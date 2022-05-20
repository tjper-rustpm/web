interface TypographyProps {
  children: React.ReactNode;
  size?: 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
}
export const Typography = (props: TypographyProps): JSX.Element => {
  const { children, size = 'lg' } = props;

  let style = '';

  switch (size) {
    case 'md':
      style = `${style} text-base pt-0.5`;
      break;
    case 'lg':
      style = `${style} text-lg pt-0.5`;
      break;
    case 'xl':
      style = `${style} text-xl pt-0.5`;
      break;
    case '2xl':
      style = `${style} text-2xl pt-0.5`;
      break;
    case '3xl':
      style = `${style} text-3xl pt-1`;
      break;
    case '4xl':
      style = `${style} text-4xl pt-1`;
      break;
    case '5xl':
      style = `${style} text-5xl pt-1`;
      break;
  }

  return <span className={style}>{children}</span>;
};
