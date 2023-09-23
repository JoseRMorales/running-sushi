import { Button, Card, TextInput } from 'flowbite-react'

const AddDinerCard = ({ handleOnSubmit }) => {
  return (
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
  )
}
export default AddDinerCard
