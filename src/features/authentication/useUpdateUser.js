import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { updateCurrentUser } from '../../services/apiAuth';

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: ({ user }) => {
      toast.dismiss();
      toast.success('User account successfully updated');
      queryClient.setQueryData(['user'], user);
    },
    onError: (err) => {
      toast.dismiss();
      toast.error(err.message);
    },
    onMutate: () => {
      toast.loading('Updating user account...');
    },
  });

  return { updateUser, isUpdating };
}
