import { useHistory,useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";



const Tracker = () => {
    const {tracker} = useParams()
    const {data: trk, error, isPending} = useFetch('http://localhost:4000/api/trackers/' + tracker)
    const history = useHistory();
    const handleDelete = () => {
        fetch('http://localhost:4000/api/trackers/' + tracker, {
            method: 'DELETE'
        }).then(() => {
            console.log("Counter Deleted");
            history.push('/');
        })
    }
    return (
        <div className="counter-details">
            {isPending && <div className="spinner"></div>}
            {error && <div></div>}
            {trk && (
                <div className="tracker-details">
                    <h2>{trk.title}</h2>
                    <p>Days: {}</p>
                    <p>{trk.description}</p>
                    <p>Started On: {trk.start_date}</p>
                    <button onClick={() => {
                        if(window.confirm("Are you sure you want to Delete")) {
                            handleDelete()
                        }
                    }}>
                    Delete Tracker</button>
                </div>
            )}
        </div>
    );
}
export default Tracker;