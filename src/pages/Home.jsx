
import Card from '../components/ui/Card'
import HeadingFactory from '../components/ui/heading'
import Button from '../components/ui/Button'
import { FaPlus } from "react-icons/fa6";
import { useContext, useState } from 'react';
import { List, ListItem } from '../components/ui/List';
import moment from 'moment'
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { FaFilter } from "react-icons/fa";
import Input from '../components/ui/Input'
import { TaskContext } from '../memory/context';
import useSubmit from '../hooks/useSubmit';
import useCloudinary from '../hooks/useCloudinary';


const Home = () => {

  const {tasks, deleteTask} = useContext(TaskContext)

  const [addForm, setAddFrom] = useState(false)

  const [heading, setHeading] = useState('');
  const [description, setDescription] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [priority, setPriority] = useState('low');
  const [imageUrl, setImageUrl] = useState('')


  const setEditData = (item) => {
     setHeading(item.heading)
     setDescription(item.description)
     setDateTime(item.dateTime)
     setPriority(item.priority)
     setAddFrom(true)
  }


  const [uploadImage, imageError, imageLoading] = useCloudinary()
  const uploadImageDisplay = async (e) => {

    try{

      if(!e.target.files[0]){ return}
      
     const url =  await uploadImage(e.target.files[0])
       console.log(url)
       setImageUrl(url)

    }catch(e){
      console.log(e)
    }
  }

   const {postRequest, error, loading} = useSubmit({heading,description,dateTime,priority,imageUrl})
 
 
   const onsubmit = async (e) => {
    e.preventDefault()
    await postRequest()
  }

   
  
  return (
  <Card className='w-full min-h-screen shadow-md flex justify-center items-center'>
   <Card className='w-full items-center  flex  flex-col'>
   <Card className='w-full xl:w-6/12 px-1  xl:px-10 flex' >
           <HeadingFactory level={1} className='text-xl font-bold py-5 text-slate-700' >
              YOUR TASKS
           </HeadingFactory>
   </Card>

   <Card className=' w-full xl:w-6/12 flex relative  px-1 flex-col xl:px-10' >
       <Card className='flex justify-center'>
          <Button onClick={() => setAddFrom(!addForm)} className="bg-cyan-500 text-white p-4 w-full rounded-md flex items-center justify-center gap-2 ">Add <FaPlus /></Button>
      </Card>
      {/* List Section */}

      {!addForm &&<Card className='w-full flex  justify-between px-1 p-4 ps-4  text-slate-700'>
        <Card className='w-6/12'>
        <span className='text-left'>Task</span>
        </Card>
        <Card className='flex flex-row justify-between items-center  xl:pe-10 w-5/12'>
          <span className='w-full'>Edit</span><span className='w-full'>Delete</span> <span className='flex items-center gap-2 w-full'> Priority <FaFilter  size={10}/> </span>
        </Card>
      </Card> }

       {!addForm && <Card className='h-[60vh] overflow-y-auto'>
           <List className='pt-10 pb-20'>
             {tasks.map((item) => <ListItem key={item.id} className='p-4 w-full justify-between flex items-center shadow-md '>
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
       </Card>}

       {/* Add form section */}

       {addForm &&  <Card className={`w-full px-4`}>
           <form

           onSubmit={onsubmit}
           className='mt-10 w-full flex flex-col gap-2 pb-20' 
           >

            {error && <p className='w-full font-bold border-2 p-2 border-red-500 rounded-md text-red-500'>Failed to add task</p>}
            <HeadingFactory level={2} className='text-xl font-bold text-slate-500'>Add your task</HeadingFactory>
              <Card className="flex flex-col w-full ">
              <label htmlFor='heading' className='text-slate-600 font-bold py-4'>Enter the heading</label>
              <Input type='text' value={heading} onChange={(e) => setHeading(e.target.value)} name="heading" placeholder='enter the header' className='p-3 b w-full bg-slate-200 rounded-md' />
              </Card>
              <Card className="flex flex-col w-full ">
              <label htmlFor='description' className='text-slate-600 font-bold py-4'>Enter the description</label>
              <Input type='text' value={description} onChange={(e) => setDescription(e.target.value)}  name="description" placeholder='enter the description' className='p-3 b w-full bg-slate-200 rounded-md' />
              </Card>
              <Card className="flex flex-col w-full ">
              <label htmlFor='date-time'   className='text-slate-600 font-bold py-4'>select date and time</label>
              <Input type='datetime-local'  value={dateTime} onChange={(e) => setDateTime(e.target.value)} name="dateTime" className='p-3 b w-full bg-slate-200 rounded-md' />
              </Card>

              <Card className="flex flex-col w-full py-10 ">
              <label htmlFor='priority'   className='text-slate-600 font-bold py-4'>select priority</label>

               <select className='w-[200px]' value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value={'low'}>low</option>
                <option value={'medium'}>medium</option>
                <option value={'high'}>high</option>
               </select>
              </Card>
              <Card className="flex flex-col w-full border-2  p-4 rounded-xl">
               {imageUrl &&   <Card>
                  Preview
                  <img width={200} height={200} src={imageUrl} />
                </Card> }
                {imageError && <p className='w-full text-red-500'>image upload failed</p>}
                {imageLoading ? <p className='w-full'>image loading...</p>  : 
                    <>
                    <label htmlFor='image' className='text-slate-600 font-bold py-4'>selectan image</label><Input type='file'
                    name="image"

                    onChange={uploadImageDisplay}
                    className='p-3 b w-full bg-slate-200 rounded-md' /></>
                }
              </Card>

             {addForm &&  <input type="submit" disabled={loading} value={loading ? 'loading' : 'submit'} className='p-2 bg-yellow-500 font-semibold text-black rounded-md' /> }
             {addForm &&   <input type="button" value={'cancel'} onClick={() => setAddFrom(!addForm)} className='p-2 bg-slate-300 font-semibold text-slate-500 text-black rounded-md' />
    }

           </form>
       </Card> }

    
    </Card>

   </Card>
    
  </Card>
  )
}

export default Home