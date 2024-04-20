import { useState, useEffect } from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [ errors, setErrors] = useState(null); 

    useEffect(() => {
        const abortCont = new AbortController();
        fetch(url,{signal: abortCont.signal})
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