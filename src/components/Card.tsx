// export const Card = styled.div`
//   padding: 1.5rem;
//   font-size: 3rem;
//   background-color: ${(props): string => props.theme.colors.lima};
//   box-shadow: 0 0.1rem 1rem 0 ${(props): string => props.theme.colors.echo};
//   border-radius: 0.4rem;

//   width: 90%;
//   margin: 0 auto;
// `;
interface CardProps {
  children: React.ReactNode;
}

export const Card = ({ children }: CardProps): JSX.Element => {
  return <div className="p-5 bg-neutral-50 shadow-xl rounded-md w-4/6 m-auto border-slate-200 border">{children}</div>;
};
