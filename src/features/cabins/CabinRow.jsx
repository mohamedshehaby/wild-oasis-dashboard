import {
  HiEllipsisVertical,
  HiPencil,
  HiSquare2Stack,
  HiTrash,
} from 'react-icons/hi2';
import styled from 'styled-components';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Menus from '../../ui/Menus';
import Modal from '../../ui/Modal';
import { formatCurrency } from '../../utils/helpers';
import CreateCabinForm from './CreateEditCabinForm';
import { useDeleteCabin } from './useDeleteCabin';
import { useDuplicateCabin } from './useDuplicateCabin';

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const {
    id: cabinId,
    image,
    description,
    name,
    maxCapacity,
    regularPrice,
    discount,
  } = cabin;

  const { isDeleting, deleteCabin } = useDeleteCabin();

  const { isDuplicating, duplicateCabin } = useDuplicateCabin();

  const isWorking = isDeleting || isDuplicating;

  return (
    <>
      <Img src={image} alt={description} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>

      {discount ? (
        <Discount>{formatCurrency(discount)} </Discount>
      ) : (
        <span> &mdash;</span>
      )}

      <Modal>
        <Menus.Menu>
          <Menus.Toggle opens={`${cabinId}`}>
            <HiEllipsisVertical />
          </Menus.Toggle>

          <Menus.List opens={`${cabinId}`}>
            <Menus.Button
              onClick={() => {
                duplicateCabin(cabin);
              }}
            >
              <HiSquare2Stack /> <span>Duplicate</span>
            </Menus.Button>
            <Modal.Open opens='edit-cabin'>
              <Menus.Button>
                <HiPencil /> <span>Edit</span>
              </Menus.Button>
            </Modal.Open>

            <Modal.Open opens='delete-cabin'>
              <Menus.Button>
                <HiTrash /> <span>Delete</span>
              </Menus.Button>
            </Modal.Open>
          </Menus.List>
          <Modal.Window name='edit-cabin'>
            <CreateCabinForm editedCabin={cabin} />
          </Modal.Window>
          <Modal.Window name='delete-cabin'>
            <ConfirmDelete
              onConfirm={() => deleteCabin({ cabinId, image })}
              disabled={isWorking}
              resourceName='cabin'
            />
          </Modal.Window>
        </Menus.Menu>
      </Modal>
    </>
  );
}

export default CabinRow;
