
import Card from '../components/ui/Card'
import HeadingFactory from '../components/ui/heading'
import Button from '../components/ui/Button'
import { FaPlus } from "react-icons/fa6";
import { useState } from 'react';
import { tasks } from '../seed/tasks';
import { List, ListItem } from '../components/ui/List';
import moment from 'moment'
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { FaFilter } from "react-icons/fa";

const Home = () => {

  const [items] = useState(tasks)
  return (
  <Card className='w-full min-h-screen shadow-md flex justify-center items-center'>
   <Card className='w-full items-center  flex  flex-col'>
   <Card className='w-full xl:w-6/12 px-1  xl:px-10 flex' >
           <HeadingFactory level={1} className='text-xl font-bold py-5 text-slate-700' >
              YOUR TASKS
           </HeadingFactory>
   </Card>

   <Card className=' w-full xl:w-6/12 flex  px-1 flex-col xl:px-10' >
       <Card className='flex justify-center'>
          <Button className="bg-cyan-500 text-white p-4 w-full rounded-md flex items-center justify-center gap-2 ">Add <FaPlus /></Button>
      </Card>
      <Card className='w-full flex justify-between px-1 px-4 p-3 text-slate-700 '>
        <span className='text-left'>Task</span>
        <Card className='flex flex-row  gap-2 justify-evenly items-center w-5/12'>
          <span>Edit</span><span>Delete</span> <span className='flex items-center gap-2'> Priority <FaFilter  size={10}/> </span>
        </Card>
      </Card>

       <Card className='h-[60vh] overflow-y-auto'>
           <List className='pt-10 pb-20'>
             {items.map((item) => <ListItem key={item.id} className='p-4 w-full justify-between flex items-center shadow-md '>
            <Card className='flex gap-2 flex-col w-6/12'>
            <span className='truncate '>{item.heading}</span>
            <small className='text-xs text-slate-500'>{moment(item.date).format('MMMM Do YYYY, h:mm:ss a')}</small>
            </Card>
             <Card className='flex flex-row gap-2 justify-evenly  items-center w-5/12'>
             <span><Button className='bg-blue-200 px-2 w-full py-1 rounded-xl shadow-sm'><CiEdit /></Button></span>
              <span><Button className='bg-red-200 text-red-500 px-2 py-1 w-full rounded-xl shadow-sm'><MdDelete /></Button></span>
              <span><Button className={` rounded-xl w-20 py-1 px-2 shadow-sm ${item.priority === 'low' ?'bg-green-300': item.priority === 'medium' ? 'bg-orange-300' : 'bg-red-300'}`}>{item.priority}</Button></span>
             </Card>
             </ListItem>)}
           </List>
       </Card>
    </Card>

   </Card>
    
  </Card>
  )
}

export default Home