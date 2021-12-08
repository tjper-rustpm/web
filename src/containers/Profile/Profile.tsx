import Card from '../../components/Card/Card';

interface ProfileProps {
  className?: string;
}

export default function Profile({ className }: ProfileProps): JSX.Element {
  return <Card className={className}>Profile</Card>;
}
