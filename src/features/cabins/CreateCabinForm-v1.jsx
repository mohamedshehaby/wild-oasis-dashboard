import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { createCabin } from '../../services/apiCabins';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Textarea from '../../ui/Textarea';
import React from 'react';

function CreateCabinForm() {
  const queryClient = useQueryClient();

  const { mutate, isPending: isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.dismiss();

      toast.success('Cabin created successfully!');

      reset();

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
      toast.loading('Creating cabin...');
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm();

  function onSubmit(data) {
    mutate({ ...data, image: data.image[0] });
  }

  function onError(errors) {}

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin name" error={errors.name}>
        <Input
          type="text"
          id="name"
          {...register('name', {
            required: 'name is required',
          })}
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
        />
      </FormRow>

      <FormRow label="Description for website" error={errors.description}>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register('description', { required: 'Description is required' })}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          disabled={isCreating}
          id="image"
          {...register('image', { required: 'Image is required' })}
          accept="image/*"
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" disabled={isCreating}>
          Cancel
        </Button>
        <Button disabled={isCreating}>Create new cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
