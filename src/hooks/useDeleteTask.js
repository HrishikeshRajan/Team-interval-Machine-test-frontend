import { useContext,  useState } from 'react'
import baseUrl from '../../constants/baseUrl'
import { TaskContext } from '../memory/context'

const useDeleteTask = () => {

    const  {update} = useContext(TaskContext)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
        const deleteTask = async (taskId) => {
            try {
                const response = await fetch(`${baseUrl}/task/remove/${taskId}`, {
                    method: 'DELETE',
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

        
 

    return [deleteTask ,loading, error]
}

export default useDeleteTask