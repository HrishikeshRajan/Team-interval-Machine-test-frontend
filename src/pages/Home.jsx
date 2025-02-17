
import Card from '../components/ui/Card'
import HeadingFactory from '../components/ui/heading'
import Button from '../components/ui/Button'
import { FaPlus } from "react-icons/fa6";
import { useContext, useState } from 'react';
import Input from '../components/ui/Input'
import { TaskContext } from '../memory/context';
import useSubmit from '../hooks/useSubmit';
import useCloudinary from '../hooks/useCloudinary';
import TableHeader from '../components/tableHeader/TableHeader';
import Tasks from '../components/tasks/Tasks';
import useListAllTasks from '../hooks/useListAllTasks';
import useEditTask from '../hooks/useEditTask';
import ViewTask from '../components/view/ViewTask';


const Home = () => {

  const {tasks, editTask, push, view } = useContext(TaskContext)

  const [addForm, setAddFrom] = useState(false)
  const [id, setId] = useState('');
  const [heading, setHeading] = useState('');
  const [description, setDescription] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [priority, setPriority] = useState('low');
  const [imageUrl, setImageUrl] = useState('')
  const [editMode, setEditMode] = useState(false);


  const setEditData = (item) => {
     setId(item.id)
     setHeading(item.heading)
     setDescription(item.description)
     setDateTime(item.dateTime)
     setPriority(item.priority)
     setAddFrom(true)
     setEditMode(true)
  }

  const clearEditForm = () => {
    setHeading('')
    setDescription('')
    setDateTime('')
    setPriority('')
    setAddFrom(false)
    setEditMode(false)
 }


   useListAllTasks()


  const [uploadImage, imageError, imageLoading] = useCloudinary()
  const uploadImageDisplay = async (e) => {

    try{

      if(!e.target.files[0]){ return}
      
     const url =  await uploadImage(e.target.files[0])
       setImageUrl(url)

    }catch(e){
      console.log(e)
    }
  }

   const {postRequest, error, loading} = useSubmit({heading,description,dateTime,priority,imageUrl})
 
   const {updateRequest} = useEditTask()
   const onsubmit = async (e) => {
    e.preventDefault()

    if(editMode){
      editTask(id, {heading,description,dateTime,priority,imageUrl,id})
      await updateRequest({heading,description,dateTime,priority,imageUrl,id})
      return
    }


    const data = await postRequest({heading,description,dateTime,priority,imageUrl})
    push({heading,description,dateTime,priority,imageUrl,id:data.insertId})

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
       {!addForm && !view && <Card className='flex justify-center'>
          <Button onClick={() => setAddFrom(!addForm)} className="bg-cyan-500 text-white p-4 w-full rounded-md flex items-center justify-center gap-2 ">Add <FaPlus /></Button>
      </Card>}

      {/* List Section */}

      {!addForm && !view && <TableHeader /> }

       {!addForm && !view && <Tasks  tasks={tasks} setEditData={setEditData} />}

       {/* Add form section */}

       {addForm && !view &&  <Card className={`w-full px-4`}>
           <form

           onSubmit={onsubmit}
           className='mt-10 w-full flex flex-col gap-2 pb-20' 
           >

            {error && <p className='w-full font-bold border-2 p-2 border-red-500 rounded-md text-red-500'>Failed to add task</p>}
            <HeadingFactory level={2} className='text-xl font-bold text-slate-500'>{editMode ? 'Edit your task' : 'Add your task'}</HeadingFactory>
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

             {addForm && imageUrl && <input type="submit" disabled={loading} value={loading ? 'loading' : 'submit'} className='p-2 bg-yellow-500 font-semibold text-black rounded-md' /> }
             {addForm &&   <input type="button" value={'cancel'} onClick={() => clearEditForm()} className='p-2 bg-slate-300 font-semibold text-slate-500 text-black rounded-md' />
    }

           </form>
       </Card> }

          {view && <ViewTask />}    
    </Card>

   </Card>
    
  </Card>
  )
}

export default Home