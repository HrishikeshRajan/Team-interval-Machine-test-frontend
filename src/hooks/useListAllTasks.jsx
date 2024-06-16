import { useContext, useEffect, useState } from 'react'
import baseUrl from '../../constants/baseUrl'
import { TaskContext } from '../memory/context'

const useListAllTasks = () => {

    const  {update} = useContext(TaskContext)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    useEffect(() =>{
        const getData = async () => {
            try {
                const response = await fetch(`${baseUrl}/task/list/all`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                 update(result)
            } catch (err) {
                setError(true);
            } finally {
                setLoading(false);
            }
        }

        getData()
 

    },[error, loading, update])

    return [loading, error]
}

export default useListAllTasks