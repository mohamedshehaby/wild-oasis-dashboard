import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteCabin as deleteCabinApi } from '../../services/apiCabins';

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: ({ cabinId, image }) => deleteCabinApi(cabinId, image),
    onSuccess: () => {
      toast.dismiss();
      toast.success('Cabin deleted successfully');
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
    },
    onError: (error) => {
      toast.dismiss();
      toast.error(error.message);
    },
    onMutate: () => {
      toast.dismiss();
      toast.loading('Deleting cabin...');
    },
  });

  return { isDeleting, deleteCabin };
}
