/* eslint-disable no-unused-vars */
import { useState } from "react";
import baseUrl from "../../constants/baseUrl";
const useSubmit = (data) => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const postRequest = async () => {
        setLoading(true);
        setError(null);

         if(Object.values(data).includes('')){
            setError(true)
            return
         }
        const {heading, description, dateTime, priority, imageUrl} = data
        
        const formData = new FormData();
        formData.append('heading', heading);
        formData.append('description', description);
        formData.append('dateTime', dateTime);
        formData.append('priority', priority)
        if (imageUrl) {
          formData.append('image', imageUrl);
        }

        
        try {
            const response = await fetch(`${baseUrl}/task/create`, {
                method: 'POST',
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

    return { postRequest, loading, error };
}

export default useSubmit