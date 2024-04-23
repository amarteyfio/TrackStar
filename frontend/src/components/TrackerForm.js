import { useState } from 'react';
import { useHistory } from 'react-router-dom';


const TrackerFrom = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [notes, setNotes] = useState('');
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();
    



    const handleSubmit = (e) => {
        e.preventDefault();
        if(title === '' || description === '')
        {
            alert("Please fill in the required fields");
            return;
        }
        const tracker = {title, description, notes};

        fetch('http://localhost:4000/api/trackers', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(tracker)
        })
        .then(() => {
            console.log("New Tracker Added Added");
            setNotes('');
            setDescription('');
            setTitle('');
            window.location.reload();
        })

    }
    return (
        <div className="tracker-form">
            <form onSubmit={handleSubmit}>
                <label>Tracker Title:</label>
                <input type="text" name="title" value={title} required onChange={(e) => setTitle(e.target.value)}></input>
                <label>Description:</label>
                <textarea name="description" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                <label>Notes:</label>
                <textarea name="notes" value={notes} onChange={(e) => setNotes(e.target.value)}></textarea>
                {!isPending && <button>Start Tracking</button>}
                {isPending && <button disabled>Adding Tracker...</button>}
            </form>
        </div>
    );
} 
export default TrackerFrom;