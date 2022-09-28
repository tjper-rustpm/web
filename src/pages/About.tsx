import Logo from '../components/Logo/Logo';
import { Typography } from '../components/Typography';

export const About = (): JSX.Element => {
  return (
    <div className="w-10/12 mx-auto">
      <div className="flex-inline justify-start mb-10 px-4 md:hidden">
        <span className="mt-3 mr-4">
          <Typography size="4xl">Welcome to</Typography>
        </span>
        <span>
          <Logo size="large" />
        </span>
      </div>
      <div className="hidden md:flex justify-center items-center mb-10 px-4">
        <span className="mt-6 mr-8">
          <Typography size="5xl">Welcome to</Typography>
        </span>
        <span>
          <Logo size="larger" />
        </span>
      </div>
      <div className="text-md font-sans">
        <h4 className="text-xl font-medium mb-3">Scheduled Rust</h4>
        <p className="leading-7 mb-3">
          We operate scheduled servers to make Rust more accessible for players who do not have time for the 24/7 grind
          and still want a vanilla experience.
        </p>
        <p className="leading-7 mb-5">
          This translates to more online raids, more balanced progression, and more sleep.
        </p>
        <h4 className="text-xl font-medium mb-3">Community</h4>
        <p className="leading-7 mb-3">
          Your feedback is valuable to us. Join our Discord; ask questions and let us know what servers and schedules
          you&apos;d like to see.
        </p>
        <p className="leading-7 mb-3">
          If you&apos;re interested and qualified, submit an application to become a server admin. Do know, we take this
          role very seriously as you would become a representative of the organization.
        </p>
      </div>
    </div>
  );
};
