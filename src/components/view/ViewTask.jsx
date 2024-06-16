import { useContext } from "react"
import { TaskContext } from "../../memory/context"
import HeadingFactory from "../ui/heading"
import Card from "../ui/Card"
import Image from "../ui/Image"
import Button from "../ui/Button"
import moment from 'moment'
import { CiCalendarDate } from "react-icons/ci";

const ViewTask = () => {
    const {view, removeSelectedTaskToView} = useContext(TaskContext)
  return (
    <div className="w-auto shadow-md px-2">
        <HeadingFactory level={3} className="font-bold py-4 text-xl">{view.heading}</HeadingFactory>
        <Card className="text-wrap">
            <p className="text-lg break-words">{view.description}</p>
        </Card>
        <Card className="border-2 mt-5 border-slate-200 p-2 flex items-center rounded-xl">
            <span className="flex items-center gap-2"><CiCalendarDate /> Date</span>
            <span> {moment(view.date).format('MMMM Do YYYY, h:mm:ss a')}</span>
        </Card>
        <Card className="p-2 mt-5 border-2 gap-2 border-slate-200 rounded-xl flex items-center ">
            <span className="">priority</span>
            <span className={`${view.priority  == 'low' ? 'bg-green-400' : view.priority === 'medium' ? 'bg-orange-400' : 'bg-red-400' } p-2 rounded-full`}>{view.priority}</span>
        </Card>
        <Card className="pt-5 w-full justify-center flex">
           <Image  src={view.image} width={200} alt={`${view.heading}.jpg`} className="border-md" />
        </Card>
        <Card className="bg-blue-400 text-white p-4 rounded-md mt-5">
            <Button onClick={() =>removeSelectedTaskToView()} className="text-center w-full" >Back</Button>
        </Card>
    </div>
  )
}

export default ViewTask