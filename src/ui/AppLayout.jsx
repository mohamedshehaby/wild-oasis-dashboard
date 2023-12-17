import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';

const StyledAppLayout = styled.div`
  display: grid;
  height: 100dvh;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow-y: scroll;
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 4.8rem;
`;

const AppLayout = () => {
  return (
    <StyledAppLayout>
      <Header />
      <Sidebar />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
};

export default AppLayout;
