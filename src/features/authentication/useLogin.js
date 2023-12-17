import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toast } from 'react-hot-toast';

import { useNavigate } from 'react-router-dom';
import { login as loginApi } from '../../services/apiAuth';

export function UseLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isPending: isLoading, mutate: login } = useMutation({
    mutationFn: loginApi,

    onSuccess: ({ user }) => {
      navigate('/dashboard');
      console.log(user);
      queryClient.setQueryData(['user'], user);
    },
    onError: (error) => {
      console.log('Login Error', error);
      toast.error('Provided credentials are invalid');
    },
  });

  return { login, isLoading };
}
