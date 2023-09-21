import './App.css'

import { Button, Card, Modal, TextInput } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { HiOutlineExclamationCircle } from 'react-icons/hi'

function App () {
  const [openModal, setOpenModal] = useState()
  const [deleteMode, setDeleteMode] = useState(false)
  const props = { openModal, setOpenModal }

  // Get from local storage
  const localDiners = JSON.parse(localStorage.getItem('diners'))
  const localCount = JSON.parse(localStorage.getItem('count'))

  const [count, setCount] = useState(localCount || 0)
  const [diners, setDiners] = useState(localDiners || [])

  const handleAdd = (name, isNew) => {
    if (!isNew) { setCount(count + 1) }
    // If the diner is already in the list, update the count if not add it
    if (diners.find(diner => diner.name === name)) {
      setDiners(diners.map(diner => {
        if (diner.name === name) {
          diner.count++
        }
        return diner
      }))
    } else {
      setDiners([...diners, { name, count: 0 }])
    }
    console.log(diners)
  }

  const handleDelete = (name) => {
    if (count > 0) { setCount(count - 1) }
    // If cont is 0, remove the diner from the list
    if (diners.find(diner => diner.name === name)) {
      const newDiners = diners.map(diner => {
        if (diner.name === name) {
          diner.count--
          if (diner.count <= 0) {
            return undefined
          }
        }
        return diner
      })
      setDiners(newDiners.filter(diner => diner !== undefined))
    }
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()

    const name = e.target.name.value

    // If the diner is already in the list return
    if (diners.find(diner => diner.name === name)) {
      e.target.name.value = ''
      return
    }

    handleAdd(name, true)
    e.target.name.value = ''
  }

  const handleClear = () => {
    setCount(0)
    setDiners([])
    props.setOpenModal(undefined)
  }

  // Save to local storage
  useEffect(() => {
    localStorage.setItem('diners', JSON.stringify(diners))
    localStorage.setItem('count', JSON.stringify(count))
  }, [diners, count])

  return (
    <main className='bg-slate-800 text-white flex flex-col items-center justify-center p-16 min-h-screen'>
      <h1 className='text-6xl pb-6 text-center'>Running Sushi</h1>
      <section className='flex flex-wrap gap-4 justify-center mt-8'>
        {
          diners.map((diner) => (
            <Card className='bg-slate-900 text-white border border-slate-700 w-40 flex flex-col items-center justify-center' key={diner.name}>
              <h2 className='text-2xl pb-4 font-bold'>{diner.name}</h2>
              <h3>Count: {diner.count}</h3>
              {
                deleteMode
                  ? <Button color='failure' onClick={() => handleDelete(diner.name)}>
                    <span className='text-xl font-bold'>
                      -1
                    </span>
                  </Button>
                  : <Button onClick={() => handleAdd(diner.name, false)}>
                    <span className='text-xl font-bold'>
                      +1
                    </span>
                  </Button>

              }
            </Card>
          ))
        }
      </section>
      <div className='mt-8 flex gap-4 flex-wrap justify-center'>
        <Card className='bg-slate-900 text-white border border-slate-700 min-w-100px w-40 flex flex-col items-center justify-center'>
          <h2 className='text-2xl pb-4'>Total</h2>
          <span className='text-xl font-bold text-center'>
            {count}
          </span>
        </Card>
        <Card className='bg-slate-900 text-white border border-slate-700 min-w-100px w-60 flex flex-col items-center justify-center'>
          <h2 className='text-2xl pb-4'>Add:</h2>
          <form onSubmit={handleOnSubmit} className='flex flex-col gap-4 max-w-md'>
            <div>
              <TextInput
                id="name"
                placeholder="Name"
                required
              />
              <Button type="submit" className='mt-4'>
                Submit
              </Button>
            </div>
          </form>
        </Card>
      </div>
      <footer className='mt-8 flex gap-4 flex-wrap justify-center'>
        <Button color='failure' onClick={() => props.setOpenModal('pop-up')}>Clear All</Button>
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
        <Button color='warning' onClick={() => setDeleteMode(!deleteMode)}>
          {
            deleteMode
              ? 'Cancel Delete'
              : 'Delete'
          }
        </Button>
      </footer>
    </main>
  )
}

export default App
