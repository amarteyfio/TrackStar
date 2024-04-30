import { TrackerContext } from "../context/TrackerContext";
import { useContext } from "react";


export const useTrackersContext = () => {
    const context = useContext(TrackerContext);
    if (context === undefined) {
        throw new Error("useTrackersContext must be used within a TrackerContextProvider");
    }
    return context;
}