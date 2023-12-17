import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';
import toast from 'react-hot-toast';
import { createEditCabin } from '../../services/apiCabins';

export function useEditCabin(imagePath) {
  // Use a ref to store the previous image path for editing
  const previousImagePath = useRef(imagePath);

  // Access the query client from React Query
  const queryClient = useQueryClient();

  // Define a custom hook for handling the mutation to edit an existing cabin
  const { mutate: editCabin, isPending: isEditing } = useMutation({
    mutationFn: ({ newCabinData, editedCabinId }) =>
      createEditCabin(newCabinData, editedCabinId, previousImagePath.current),
    onSuccess: () => {
      // Display success toast, reset the form, and invalidate the cabins query
      toast.dismiss();
      toast.success('Cabin edited successfully!');

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
      toast.loading('Editing cabin...');
    },
  });

  return { editCabin, isEditing };
}
