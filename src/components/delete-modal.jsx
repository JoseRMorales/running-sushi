import { Button, Modal } from 'flowbite-react'
import { HiOutlineExclamationCircle } from 'react-icons/hi'

const DeleteModal = ({ props, handleClear }) => {
  return (
    <Modal show={props.openModal === 'pop-up'} size="md" popup onClose={() => props.setOpenModal(undefined)} >
      <Modal.Body className="bg-slate-700 pt-12 border-2 border-slate-800">
        <div className="text-center">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-200" />
          <h3 className="mb-5 text-lg font-normal text-gray-400">
            Clear all?
          </h3>
          <div className="flex justify-center gap-4">
            <Button color="failure" onClick={handleClear}>
              Confirm Delete
            </Button>
            <Button color="gray" onClick={() => props.setOpenModal(undefined)}>
              No, cancel
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}
export default DeleteModal
