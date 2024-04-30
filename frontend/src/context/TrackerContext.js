import { createContext, useReducer } from "react";

export const TrackerContext = createContext();

export const trackerReducer = (state, action) => 
{
    switch(action.type)
    {
        case 'SET_TRACKERS':
            return {
                trackers: action.payload
            };
        case 'ADD_TRACKER':
            return {
                trackers: [action.payload, ...state.trackers]
            };
        default:
            return state;
    }

}

export const TrackerContextProvider = ({children}) => 
{
    const [state, dispatch] = useReducer(trackerReducer, {
        trackers:null
    });

    

    return (
        <TrackerContext.Provider value={{...state, dispatch}}>
        {children}
    </TrackerContext.Provider>
    )
}
