import { useState } from "react";
import baseUrl from "../../constants/baseUrl";

const useEditTask = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateRequest = async (data) => {
        setLoading(true);
        setError(null);


        const {heading, description, dateTime, priority, imageUrl, id} = data
        
        const formData = new FormData();
       if(heading){
        formData.append('heading', heading);
       }
       if(description){
        formData.append('description', description);
       }
       if(dateTime){
        formData.append('dateTime', dateTime)
       }
  
       if(priority){
        formData.append('priority', priority)
       }
      
        if (imageUrl) {
          formData.append('image', imageUrl);
        }

        
        try {
            const response = await fetch(`${baseUrl}/task/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            return result;
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return { updateRequest, loading, error };
}

export default useEditTask