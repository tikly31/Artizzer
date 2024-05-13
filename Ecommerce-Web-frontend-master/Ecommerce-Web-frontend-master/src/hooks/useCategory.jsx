import {useState , useEffect} from 'react'
import axios from 'axios'

function useCategory() {

    const [categories, setCategories] = useState([]);
    
    // Load categories
    const getAllCategories = async () => {
        try {
            const { data } = await axios.get(
                `${import.meta.env.VITE_APP_SERVER_HOST}/api/v1/category/categories`
            );
            if (data?.success) {
                setCategories(data?.categories);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllCategories();
    }, []);

    return categories;
}

export default useCategory