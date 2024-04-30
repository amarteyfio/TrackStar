//import useFetch from "../hooks/useFetch";
import TrackerList from "../components/TrackerList";
import TrackerForm from "../components/TrackerForm";
import { useAuthContext } from "../hooks/useAuthContext";
import { useTrackersContext } from "../hooks/useTrackersContext";
import { useEffect } from "react";


const Home = () => {
    const { user } = useAuthContext();
    //const {data: trackers, isPending, errors} = useFetch('http://localhost:4000/api/trackers/');
    const {trackers, dispatch} = useTrackersContext();

    useEffect(() => {
        const fetchTrackers = async () => {
            const res = await fetch('http://localhost:4000/api/trackers', {
                headers: {
                    'Authorization': 'Bearer ' + user.token
                }
            });
            const data = await res.json();

            if(res.ok)
            {
                dispatch({type: 'SET_TRACKERS', payload: data})
            }
        }

        if(user)
        {
            fetchTrackers();
        }

    },[dispatch, user])
    return (
        <div className="home">
            {!trackers && <div className="spinner"></div>}
            {trackers && <TrackerList trackers={trackers} title="Trackers" />}
            {trackers && <TrackerForm />}
        </div>
    );
}
export default Home;