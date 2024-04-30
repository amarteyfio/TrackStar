import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { useTrackersContext } from '../hooks/useTrackersContext';

const TrackerFrom = () => {
    const { dispatch } = useTrackersContext();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [notes, setNotes] = useState('');
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();
    const { user } = useAuthContext();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (title === '' || description === '') {
            alert("Please fill in the required fields");
            return;
        }

        if (!user) {
            console.log('Unauthorized');
            return;
        }

        const tracker = { title, description, notes };

        try {
            setIsPending(true);
            const response = await fetch('http://localhost:4000/api/trackers', {
                method: 'POST',
                body: JSON.stringify(tracker),
                headers: {
                    'Authorization': 'Bearer ' + user.token,
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            setIsPending(false);

            if (!response.ok) {
                console.error('Error:', data.error);
            } else {
                setTitle('');
                setDescription('');
                setNotes('');
                dispatch({ type: 'ADD_TRACKER', payload: data });
                console.log("New Tracker Added");
            }
        } catch (error) {
            console.error('Error:', error);
            setIsPending(false);
        }
    };

    return (
        <div className="tracker-form">
            <form onSubmit={handleSubmit}>
                <label>Tracker Title:</label>
                <input type="text" name="title" value={title} required onChange={(e) => setTitle(e.target.value)} />
                <label>Description:</label>
                <textarea name="description" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                <label>Notes:</label>
                <textarea name="notes" value={notes} onChange={(e) => setNotes(e.target.value)}></textarea>
                {!isPending && <button>Start Tracking</button>}
                {isPending && <button disabled>Adding Tracker...</button>}
            </form>
        </div>
    );
};

export default TrackerFrom;
