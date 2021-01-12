import { useEffect, useState } from 'react';
import { db } from '../firebase';

const useImages = () => {
    const [images, setImages] = useState([]);



    useEffect(() => {
      const useSubscribe= db.collection('images').orderBy("name").onSnapshot(snapshot =>{ 
      const imgs = [];
          
           snapshot.forEach(doc => {
               imgs.push({
                   id: doc.id,
                   ...doc.data(),
               });
           });
           setImages(imgs);
        });
        return useSubscribe;
}, []);

    return { images }
}
 
export default useImages;