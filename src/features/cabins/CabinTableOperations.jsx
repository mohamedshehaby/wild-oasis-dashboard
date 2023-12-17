import Filter from '../../ui/Filter';
import SortBy from '../../ui/SortBy';
import TableOperations from '../../ui/TableOperations';

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField={'discount'}
        options={[
          { label: 'All', value: 'all' },
          { label: 'With discount', value: 'with-discount' },
          { label: 'No discount', value: 'no-discount' },
        ]}
      />
      <SortBy
        options={[
          { label: 'Sort by name (A-Z)', value: 'name-asc' },
          {
            label: 'Sort by name (Z-A)',
            value: 'name-desc',
          },
          { label: 'Sort by price (Low first)', value: 'regularPrice-asc' },
          { label: 'Sort by price (high first)', value: 'regularPrice-desc' },
          { label: 'Sort by capacity (Low first)', value: 'maxCapacity-asc' },
          { label: 'Sort by capacity (high first)', value: 'maxCapacity-desc' },
        ]}
        type='white'
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
