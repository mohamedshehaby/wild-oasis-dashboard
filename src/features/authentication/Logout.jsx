import { HiArrowRightOnRectangle } from 'react-icons/hi2';
import ButtonIcon from '../../ui/ButtonIcon';
import { useLogout } from './useLogout';

function Logout() {
  const { isLoading, logout } = useLogout();
  return (
    <ButtonIcon disabled={isLoading} onClick={logout}>
      <HiArrowRightOnRectangle />
    </ButtonIcon>
  );
}

export default Logout;
