import { useForm } from 'react-hook-form';

import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Textarea from '../../ui/Textarea';
import { useCreateCabin } from './useCreateCabin';
import { useEditCabin } from './useEditCabin';

function CreateCabinForm({ editedCabin = {}, onCloseModal }) {
  // Destructure editedCabin for easy access to its properties
  const { id: editedCabinId, ...editedCabinValues } = editedCabin;

  // Check if the form is in editing mode
  const isEditingSession = Boolean(editedCabinId);

  const { isCreating, createCabin } = useCreateCabin();

  const { isEditing, editCabin } = useEditCabin(editedCabin.image);

  // Determine if any mutation is currently in progress
  const isWorking = isEditing || isCreating;

  // Set up react-hook-form with default values for editing mode
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm({ defaultValues: isEditingSession ? editedCabinValues : {} });

  // Function to handle form submission
  function onSubmit(data) {
    // If editing, determine if image is a string or an array and call editCabin accordingly
    if (isEditingSession) {
      const image = typeof data.image === 'string' ? data.image : data.image[0];
      editCabin(
        { newCabinData: { ...data, image }, editedCabinId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    } else {
      // If creating, directly call createCabin with the first image in the array
      createCabin(
        { ...data, image: data.image[0] },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    }
  }

  // Empty error handling function
  function onError(errors) {}

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? 'modal' : 'regular'}
    >
      {/* Form rows for different input fields */}
      <FormRow label="Cabin name" error={errors.name}>
        <Input
          type="text"
          id="name"
          {...register('name', {
            required: 'Name is required',
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors.maxCapacity}>
        <Input
          type="number"
          id="maxCapacity"
          {...register('maxCapacity', {
            required: 'Maximum capacity is required',
            min: {
              value: 1,
              message: 'Minimum capacity is 1',
            },
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors.regularPrice}>
        <Input
          type="number"
          id="regularPrice"
          {...register('regularPrice', {
            required: 'Regular price is required',
            min: {
              value: 1,
              message: 'Minimum price is 1',
            },
            valueAsNumber: true,
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Discount" error={errors.discount}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register('discount', {
            required: 'Discount is required',
            validate: (value) =>
              value <= getValues('regularPrice') ||
              'Discount cannot be greater than regular price',
            valueAsNumber: true,
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Description for website" error={errors.description}>
        <Textarea
          id="description"
          defaultValue=""
          {...register('description', { required: 'Description is required' })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          disabled={isWorking}
          id="image"
          {...register('image', {
            required: isEditingSession ? false : 'Image is required',
          })}
          accept="image/*"
        />
      </FormRow>

      {/* Form actions (Cancel and Submit buttons) */}
      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          disabled={isWorking}
          onClick={() => onCloseModal()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditingSession ? 'Edit cabin' : 'Create new cabin'}{' '}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
