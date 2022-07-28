import { useRouter } from '../router/router';
import { toast } from 'react-hot-toast';

export const oops = (to = '') => {
  const router = useRouter();

  toast.error('Oops! Something went wrong.\n\nPlease contact support.');
  if (to !== '') {
    setTimeout(() => {
      router.push('/servers');
    }, 3000);
  }
};
