import { Card } from '../../styles/Card';

interface ProfileProps {
  className?: string;
}

export default function Profile({ className }: ProfileProps): JSX.Element {
  return <Card className={className}>Profile</Card>;
}
