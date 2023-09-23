import { useEffect, useState } from 'react'

import AddDinerCard from './components/add-diner-card'
import DinerCard from './components/diner-card'
import Footer from './components/footer'
import TotalCard from './components/total-card'

function App () {
  const [deleteMode, setDeleteMode] = useState(false)
  const [openModal, setOpenModal] = useState()
  const props = { openModal, setOpenModal }

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
  }

  const handleDelete = (name) => {
    if (count > 0) { setCount(count - 1) }

    // If count is 0, remove the diner from the list
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
            <DinerCard diner={diner} handleDelete={handleDelete} handleAdd={handleAdd} deleteMode={deleteMode} key={diner.name} />
          ))
        }
      </section>
      <article className='mt-8 flex gap-4 flex-wrap justify-center'>
        <TotalCard count={count} />
        <AddDinerCard handleOnSubmit={handleOnSubmit} />
      </article>
      <Footer handleClear={handleClear} setDeleteMode={setDeleteMode} deleteMode={deleteMode} props={props} />
    </main>
  )
}

export default App
