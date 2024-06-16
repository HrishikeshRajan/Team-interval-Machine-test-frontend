import { useContext, useState } from 'react'
import { TaskContext } from '../memory/context'
import baseUrl from '../../constants/baseUrl'

const useSort = () => {
    const  {update} = useContext(TaskContext)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

        const getData = async (sortBy) => {
            try {
                const response = await fetch(`${baseUrl}/task/list/sort/priority?sort=${sortBy}`, {
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

    
    return [getData , loading, error]
}

export default useSort