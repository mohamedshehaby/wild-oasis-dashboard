import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import CreateCabinForm from './CreateEditCabinForm';

function AddCabin() {
  return (
    <Modal>
      <Modal.Open opens="add-cabin">
        <Button>Add new Cabin</Button>
      </Modal.Open>
      <Modal.Window name="add-cabin">
        <CreateCabinForm />
      </Modal.Window>
    </Modal>
  );
}

// function AddCabin() {
//   const [isOpenModal, setIsOpenModal] = useState(false);

//   const handleCloseModal = () => setIsOpenModal(false);

//   const handleOpenModal = () => setIsOpenModal(true);

//   return (
//     <>
//       <Button onClick={handleOpenModal}>Add new Cabins</Button>
//       {isOpenModal && (
//         <Modal onClose={handleCloseModal}>
//           <CreateCabinForm onCloseModal={handleCloseModal} />{' '}
//         </Modal>
//       )}
//     </>
//   );
// }

export default AddCabin;
