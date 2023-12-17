import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { signUp as signUpApi } from '../../services/apiAuth';
export function useSignUp() {
  const { isPending: isLoading, mutate: signUp } = useMutation({
    mutationFn: signUpApi,
    onSuccess: () => {
      toast.dismiss();
      toast.success('Account created successfully');
      toast.success('Please check your email to verify your account');
    },
    onError: (error) => {
      console.log(error);
      toast.dismiss();
      toast.error(`Can't create account`);
    },
    onMutate: () => {
      toast.loading('Creating account..');
    },
  });

  return { isLoading, signUp };
}
