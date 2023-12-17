import { useSearchParams } from 'react-router-dom';
import Select from '../ui/Select';

function SortBy({ options, type }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const value = searchParams.get('sortBy') || options[0].value;

  function handleChange(event) {
    searchParams.set('sortBy', event.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select type={type} value={value} onChange={handleChange}>
      {options.map((option, index) => (
        <option value={option.value} key={index}>
          {option.label}
        </option>
      ))}{' '}
    </Select>
  );
}

export default SortBy;
