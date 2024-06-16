
import { FaFilter } from 'react-icons/fa6'
import Card from '../ui/Card'
import { useState } from 'react'
import useSort from '../../hooks/useSort'

const TableHeader = () => {

  const [index, setIndex] = useState(0)
    
  const [sortBy] = useState(['low','medium','high', 'all'])

   const [fetchBySort] = useSort()
  const sorts = async () => {

       setIndex((val) => val+1)
       if(index === sortBy.length - 1){
        setIndex(0)
       }
       await fetchBySort(sortBy[index])

  }




  return (
    <Card className='w-full flex  justify-between px-1 p-4 ps-4  text-slate-700'>
        <Card className='w-6/12'>
        <span className='text-left'>Task</span>
        </Card>
        <Card className='flex flex-row justify-between items-center  xl:pe-10 w-5/12'>
          <span className='w-full'>Edit</span><span className='w-full'>Delete</span> 
          <button onClick={() => sorts()} className='flex items-center gap-2 w-full'> Priority <FaFilter  size={10}/> </button>
        </Card>
      </Card>
  )
}

export default TableHeader