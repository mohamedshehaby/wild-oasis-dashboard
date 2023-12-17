import UpdateSettingsForm from '../features/settings/UpdateSettingsForm.jsx';
import Heading from '../ui/Heading.jsx';

function Settings() {
  return (
    <>
      <Heading as="h1">Update hotel settings</Heading>
      <UpdateSettingsForm />
    </>
  );
}

export default Settings;
