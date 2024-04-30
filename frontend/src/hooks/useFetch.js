//UNUSED
import { useState, useEffect } from "react";
import { useAuthContext } from "./useAuthContext";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [ errors, setErrors] = useState(null);
    const { user } = useAuthContext(); 

    useEffect(() => {
        if(!user)
        {
            setIsPending(false);
            setErrors("Unauthenticated Request");
            return;
        }
        const abortCont = new AbortController();
        fetch(url,{
            headers: {
                "Authorization": `Bearer ${user.token}`
            },
            signal: abortCont.signal
        })
        .then(res => 
            {
                if(!res.ok){
                    throw Error('Could not fetch the data for that resource');
                }
                return res.json()
            })
            .then(data => {
                setData(data)
                setIsPending(false)
            })
            .catch(err => {
                if (err.name === 'AbortError') {
                    console.log('fetch aborted');
                } else {
                setIsPending(false)
                setErrors(err)
                }
            })
        return () => abortCont.abort();
    },[url]);


    return {data, isPending, errors};
}

export default useFetch;