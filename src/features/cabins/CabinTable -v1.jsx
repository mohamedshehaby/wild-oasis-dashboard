import Spinner from '../../ui/Spinner';
import Table from '../../ui/Table';
import { useCabins } from './useCabins';

const Table = styled.div`
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
  //
`;

function CabinTable() {
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState(null);
  // const [data, setData] = useState({});

  // useEffect(() => {
  //   const fetchCabins = async () => {
  //     try {
  //       setIsLoading(true);
  //       const { data, error } = await supabase.from('Cabins').select('*');

  //       if (error) {
  //         console.log(error);
  //         throw new Error('Cabins could not be loaded');
  //       }

  //       setData(data);
  //     } catch (e) {
  //       setError(e);
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchCabins();
  // }, []);

  const { isLoading, cabins } = useCabins();

  if (isLoading) return <Spinner />;

  return (
    <Table role="table">
      <TableHeader role="row">
        <div>&nbsp;</div>
        <div>cabin</div>
        <div>capacity</div>
        <div>price</div>
        <div>discount</div>
        <div>&nbsp;</div>
      </TableHeader>
      {cabins.map((cabin) => (
        <CabinRow cabin={cabin} key={cabin.id} />
      ))}
    </Table>
  );
}

export default CabinTable;
