/* eslint-disable react/prop-types */

import { useContext } from 'react';
import Button from '../ui/Button'
import Card from '../ui/Card'
import { List, ListItem } from '../ui/List';
import moment from 'moment';
import { TaskContext } from '../../memory/context';
import { CiEdit } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';

const Tasks = ({tasks, setEditData}) => {

    const {deleteTask} = useContext(TaskContext)
  return (
    <Card className='h-[60vh] overflow-y-auto'>
         <List className='pt-10 pb-20'>
          {tasks.map((item) => 
                <ListItem key={item.id} className='p-4 w-full justify-between flex items-center shadow-md '>
                     <Card className='flex gap-2 flex-col w-6/12'>
                         <span className='truncate '>{item.heading}</span>
                         <small className='text-xs text-slate-500'>{moment(item.date).format('MMMM Do YYYY, h:mm:ss a')}</small>
                      </Card>
                     <Card className='flex flex-row gap-2 justify-evenly  items-center w-5/12'>
                     <span><Button onClick={() => setEditData(item)} className='bg-blue-200 px-2 w-full py-1 rounded-xl shadow-sm'><CiEdit /></Button></span>
                     <span><Button onClick={() => deleteTask(item.id)} className='bg-red-200 text-red-500 px-2 py-1 w-full rounded-xl shadow-sm'><MdDelete /></Button></span>
                     <span><Button className={` r  ounded-xl w-20 py-1 px-2 shadow-sm ${item.priority === 'low' ?'bg-green-300': item.priority === 'medium' ? 'bg-orange-300' : 'bg-red-300'}`}>{item.priority}</Button></span>
                     </Card>
                </ListItem>)}
        </List>
    </Card>
  )
}

export default Tasks