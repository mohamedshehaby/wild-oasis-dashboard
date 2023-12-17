import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateSetting as updateSettingAPi } from '../../services/apiSettings';

export function useUpdateSetting() {
  const queryClient = useQueryClient();

  const { isPending: isUpdating, mutate: updateSetting } = useMutation({
    mutationFn: updateSettingAPi,
    onSuccess: () => {
      toast.dismiss();
      toast.success('Settings has been updated');
      queryClient.invalidateQueries(['settings']);
    },
    onError: (error) => {
      toast.dismiss();
      toast.error(error.message);
    },
    onMutate: () => {
      toast.loading('Updating settings...');
    },
  });

  return { isUpdating, updateSetting };
}
