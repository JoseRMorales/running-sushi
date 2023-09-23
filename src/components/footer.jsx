import { Button } from 'flowbite-react'

import DeleteModal from './delete-modal'

const Footer = ({ handleClear, setDeleteMode, deleteMode, props }) => {
  return (
    <footer className='mt-8 flex gap-4 flex-wrap justify-center'>
      <Button color='failure' onClick={() => props.setOpenModal('pop-up')}>Clear All</Button>
      <DeleteModal props={props} handleClear={handleClear} />
      <Button color='warning' onClick={() => setDeleteMode(!deleteMode)}>
        {
            deleteMode
              ? 'Cancel Delete'
              : 'Delete'
          }
      </Button>
    </footer>
  )
}
export default Footer
