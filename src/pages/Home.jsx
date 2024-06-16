
import Card from '../components/ui/Card'
import HeadingFactory from '../components/ui/heading'
import Button from '../components/ui/Button'
import { FaPlus } from "react-icons/fa6";
import { useState } from 'react';
import { tasks } from '../seed/tasks';
import { List, ListItem } from '../components/ui/List';

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

       <Card className='h-[60vh] overflow-y-auto'>
           <List className='pt-10 pb-20'>
             {items.map((item) => <ListItem className='p-4 w-full justify-between flex items-center shadow-md ' key={item.id}>
              <span className='truncate w-6/12'>{item.heading}</span>
             <Card className='flex gap-2'>
             <span><Button className='bg-blue-200 px-2 py-1 rounded-xl'>edit</Button></span>
              <span><Button className='bg-red-200 px-2 py-1 rounded-xl'>delete</Button></span>
              <span><Button className='border-2 rounded-xl px-2'>priorty</Button></span>
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