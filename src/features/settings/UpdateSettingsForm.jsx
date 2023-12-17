import { useForm } from 'react-hook-form';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';
import { useSettings } from './useSettings';
import { useUpdateSetting } from './useUpdateSetting';

function UpdateSettingsForm() {
  const { isLoading, settings } = useSettings();

  const { isUpdating, updateSetting } = useUpdateSetting();

  const { register, handleSubmit, getValues } = useForm({
    defaultValues: settings,
  });

  function handleUpdateSetting({ target: { name, value } }) {
    if (!value) return;

    updateSetting({ [name]: value });
  }

  if (isLoading) return <Spinner />;
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="minNights"
          {...register('minBookingLength')}
          onBlur={handleUpdateSetting}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="maxNights"
          {...register('maxBookingLength')}
          onBlur={handleUpdateSetting}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="maxGuests"
          {...register('maxGuestPerBooking')}
          onBlur={handleUpdateSetting}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfastPrice"
          {...register('breakfastPrice')}
          onBlur={handleUpdateSetting}
          disabled={isUpdating}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
