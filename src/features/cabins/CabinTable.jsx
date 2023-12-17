import { useSearchParams } from 'react-router-dom';
import Empty from '../../ui/Empty';
import Menus from '../../ui/Menus';
import Spinner from '../../ui/Spinner';
import Table from '../../ui/Table';
import CabinRow from './CabinRow';
import { useCabins } from './useCabins';

function CabinTable() {
  const { isLoading, cabins } = useCabins();

  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  // 1) Filter Cabins
  const filterValue = searchParams.get('discount') || 'all';

  let filteredCabins = cabins;

  if (filterValue === 'no-discount') {
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  }

  if (filterValue === 'with-discount') {
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
  }

  // 2) Sort Cabins

  const sortBy = searchParams.get('sortBy') || 'name-asc';
  const [field, order] = sortBy.split('-');
  const modifier = order === 'asc' ? 1 : -1;

  const sortedCabins = filteredCabins.sort((a, b) => {
    if (field === 'name') {
      return a[field].localeCompare(b[field]) * modifier;
    }
    return (a[field] - b[field]) * modifier;
  });

  if (!sortedCabins.length) return <Empty resource='cabins' />;

  return (
    <Menus>
      <Table columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'>
        <Table.Header>
          <div>&nbsp;</div>
          <div>cabin</div>
          <div>capacity</div>
          <div>price</div>
          <div>discount</div>
          <div>&nbsp;</div>
        </Table.Header>
        <Table.Body
          data={cabins}
          render={(cabin, index) => (
            <Table.Row key={cabin.id}>
              <CabinRow cabin={cabin} index={index} />
            </Table.Row>
          )}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
