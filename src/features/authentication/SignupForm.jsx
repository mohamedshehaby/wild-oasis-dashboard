import { useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useSignUp } from './useSignUp';

// Email regex: /\S+@\S+\.\S+/

function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
  });

  const { isLoading, signUp } = useSignUp();

  function onSubmit() {
    const { fullName, email, password } = getValues();
    console.log({ fullName, email, password });
    signUp(
      { fullName, email, password },
      {
        onSettled: () => reset(),
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label='Full name' error={errors['fullName']}>
        <Input
          type='text'
          id='fullName'
          {...register('fullName', { required: 'Full name is required' })}
          disabled={isLoading}
        />
      </FormRow>

      <FormRow label='Email address' error={errors['email']}>
        <Input
          type='email'
          id='email'
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Email is not valid',
            },
          })}
          disabled={isLoading}
        />
      </FormRow>

      <FormRow label='Password (min 8 characters)' error={errors['password']}>
        <Input
          type='password'
          id='password'
          {...register('password', {
            min: {
              value: 8,
              message: 'Password must be at least 8 characters long',
            },
            required: 'Password is required',
          })}
          disabled={isLoading}
        />
      </FormRow>

      <FormRow label='Repeat password' error={errors['passwordConfirm']}>
        <Input
          type='password'
          id='passwordConfirm'
          {...register('passwordConfirm', {
            required: 'Password confirmation is required',
            validate: (value, formValues) => {
              if (value !== formValues.password) return 'Passwords must match';
            },
          })}
          disabled={isLoading}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation='secondary' type='reset' disabled={isLoading}>
          Cancel
        </Button>
        <Button disabled={isLoading}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignUpForm;
