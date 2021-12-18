interface ButtonProps {
  children: React.ReactNode;
}

export const Button = ({ children }: ButtonProps): JSX.Element => {
  return (
    <button className="inline w-full h-12 bg-zinc-200 rounded-md border border-zinc-300 shadow-md my-2 text-md tracking-wider transition-all duration-75 hover:shadow-lg active:border-slate-400 active:shadow-md">
      {children}
    </button>
  );
};
