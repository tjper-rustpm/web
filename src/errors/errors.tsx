import { toast } from 'react-hot-toast';

export const oops = (): void => {
  toast.error('Oops! Something went wrong.\n\nPlease contact support.');
};
