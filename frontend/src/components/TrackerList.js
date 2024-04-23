
import { Link } from 'react-router-dom';


const TrackerList = ({ trackers, title }) => {
    return (
        <div className="tracker-list">
        {trackers.map((tracker) => {
            // Calculate the number of days since the start date
            const startDate = new Date(tracker.start_date);
            const today = new Date();
            const started_at = new Date(tracker.start_date);
            const daysSinceStart = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));

            return (
            <div className="tracker-preview" key={tracker._id}>
                <Link to={`/trackers/${tracker._id}`}>
                <h2>{tracker.title}</h2>
                <h3>{daysSinceStart}</h3>
                <p>Day(s)</p>
                <p>Started: {started_at.toDateString()}</p>
                </Link>
            </div>
            );
        })}
        </div>
    );
    };

export default TrackerList;
