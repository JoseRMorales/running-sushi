import { Card } from 'flowbite-react'

const TotalCard = ({ count }) => {
  return (
    <Card className='bg-slate-900 text-white border border-slate-700 min-w-100px w-40 flex flex-col items-center justify-center'>
      <h2 className='text-2xl pb-4'>Total</h2>
      <span className='text-xl font-bold text-center'>
        {count}
      </span>
    </Card>
  )
}
export default TotalCard
