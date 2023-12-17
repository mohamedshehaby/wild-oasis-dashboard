import AddCabin from '../features/cabins/AddCabin.jsx';
import CabinTable from '../features/cabins/CabinTable.jsx';
import CabinTableOperations from '../features/cabins/CabinTableOperations.jsx';
import Heading from '../ui/Heading.jsx';
import Row from '../ui/Row.jsx';

function Cabins() {
  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>All cabins</Heading>
        <CabinTableOperations />
      </Row>
      <Row>
        <CabinTable />
        <AddCabin />
      </Row>
    </>
  );
}

export default Cabins;
