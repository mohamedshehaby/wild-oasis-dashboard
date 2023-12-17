import SignUpForm from '../features/authentication/SignupForm.jsx';
import Heading from '../ui/Heading.jsx';

function NewUsers() {
  return (
    <>
      <Heading as='h1'>Create a new user</Heading>
      <SignUpForm />
    </>
  );
}

export default NewUsers;
