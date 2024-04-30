import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

const Tracker = () => {
    const { tracker } = useParams();
    const history = useHistory();
    const [trk, setTrk] = useState(null);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [daysSinceStart, setDaysSinceStart] = useState(0);
    const { user } = useAuthContext();

    useEffect(() => {
        if (!user) return;

        fetch('http://localhost:4000/api/trackers/' + tracker, {
            headers: {
                'Authorization': 'Bearer ' + user.token
            }
        })
        .then(res => {
            if (!res.ok) {
                throw Error('Could not fetch the data for that resource');
            }
            return res.json();
        })
        .then(data => {
            setTrk(data);
            setIsPending(false);
            if (data && data.start_date) {
                const startDate = new Date(data.start_date);
                const today = new Date();
                const differenceInTime = today.getTime() - startDate.getTime();
                const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
                setDaysSinceStart(differenceInDays);
            }
        })
        .catch(err => {
            setIsPending(false);
            setError(err.message);
        });
    }, [user, tracker]);

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to Delete")) {
            fetch('http://localhost:4000/api/trackers/' + tracker, {
                headers: {
                    'Authorization': 'Bearer ' + user.token
                },
                method: 'DELETE'
            })
            .then(() => {
                console.log("Counter Deleted");
                history.push('/');
            })
            .catch(err => {
                setError(err.message);
            });
        }
    };

    return (
        <div className="tracker">
            {isPending && <div className="spinner"></div>}
            {error && (
                <div className="error-container">
                    <div className="error">
                        <h1>500</h1>
                        <h2>Oops! Something Went Wrong {":("}</h2>
                        <p>Please Try Again Later</p>
                    </div>
                </div>
            )}
            {trk && (
                <div className="tracker-details">
                    <h2>{trk.title}</h2>
                    <h3>{daysSinceStart}</h3> {/* Display days since start */}
                    <p>{trk.description}</p>
                    <p>Started On: {trk.start_date}</p>
                    <button onClick={handleDelete}>
                        Delete Tracker
                    </button>
                </div>
            )}
            <div className="notes">
                <h2>Tracker Notes</h2>
                <hr />
                {trk ? (
                    trk.notes ? (
                        <p>{trk.notes}</p> // Render paragraph if notes exist
                    ) : (
                        <button>Add a Note</button> // Render button if notes don't exist
                    )
                ) : null}
            </div>
        </div>
    );
};

export default Tracker;
