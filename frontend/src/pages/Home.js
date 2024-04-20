import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import TrackerList from "../components/TrackerList";

const Home = () => {
    const {data: trackers, isPending, errors} = useFetch('http://localhost:4000/api/trackers/');
    return (
        <div className="home">
            {errors &&
            <div className="error-container">
            <div className="error">
                <h1>500</h1>
                <h2>Oops! Something Went Wrong {":("}</h2>
                <p>Please Try Again Later</p>
            </div>
            </div>}
            {errors && console.log(errors)}
            {isPending && <div className="spinner"></div>}
            {trackers && <TrackerList trackers={trackers} title="Trackers" />}
        </div>
    );
}
export default Home;