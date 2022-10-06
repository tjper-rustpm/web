import { toast } from 'react-hot-toast';

export const oops = (): void => {
  toast.error('Something went wrong.\n\nPlease contact support in Discord.');
};
