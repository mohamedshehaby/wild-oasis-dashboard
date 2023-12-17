import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { duplicateCabin as duplicateCabinApi } from '../../services/apiCabins';

export function useDuplicateCabin() {
  // Access the query client from React Query
  const queryClient = useQueryClient();

  // Define a custom hook for handling the mutation to create a new cabin
  const { mutate: duplicateCabin, isPending: isDuplicating } = useMutation({
    mutationFn: duplicateCabinApi,
    onSuccess: () => {
      // Display success toast, reset the form, and invalidate the cabins query
      toast.dismiss();
      toast.success('Cabin duplicated successfully!');

      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
    },
    onError: (error) => {
      // Display error toast if mutation fails
      toast.dismiss();
      toast.error(error.message);
    },
    onMutate: () => {
      // Display loading toast when the mutation is initiated
      toast.dismiss();
      toast.loading('Duplicating cabin...');
    },
  });

  return { isDuplicating, duplicateCabin };
}
