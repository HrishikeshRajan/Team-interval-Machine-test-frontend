import { useState } from 'react'
import cloudinaryUrl, { cloud_name, upload_preset } from '../../constants/cloudinaryUrl'

const useCloudinary = () => {

    const [error,setError] = useState(false)
    const [loading, setLoading] = useState(false)

        const uploadImage = async (file) => {

            try{
        
               setLoading(true)      
              const data = new FormData()
              data.append("file", file)
              data.append("upload_preset", upload_preset)
              data.append("cloud_name",cloud_name)
            
        
              const url = cloudinaryUrl
              const res = await fetch(url,{
                method:"post",
                body: data
                })
               
                const result = await res.json()
            return result.url;
            }
            catch(e) {
              setError(true)
            } finally{
                setLoading(false)
            }
          }


          return [uploadImage , error, loading ]
        
}

export default useCloudinary