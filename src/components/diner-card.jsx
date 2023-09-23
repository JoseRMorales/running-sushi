import { Button, Card } from 'flowbite-react'

const DinerCard = ({ diner, handleDelete, handleAdd, deleteMode }) => {
  return (
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
    </Card>)
}
export default DinerCard
