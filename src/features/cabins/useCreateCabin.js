import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createEditCabin } from '../../services/apiCabins';

export function useCreateCabin() {
  // Access the query client from React Query
  const queryClient = useQueryClient();

  // Define a custom hook for handling the mutation to create a new cabin
  const { mutate: createCabin, isPending: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      // Display success toast, reset the form, and invalidate the cabins query
      toast.dismiss();
      toast.success('Cabin created successfully!');

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
      toast.loading('Creating cabin...');
    },
  });

  return { isCreating, createCabin };
}
