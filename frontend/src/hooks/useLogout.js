import { useAuthContext } from "./useAuthContext";
import { useTrackersContext } from "./useTrackersContext";

export const useLogout = () => {
    const {dispatch} = useAuthContext();
    const {dispatch: trackerDispatch} = useTrackersContext();

    const logout = () => {
        //remove user item
        localStorage.removeItem('user');

        //logout
        dispatch({type: 'LOGOUT'})
        trackerDispatch({type: 'SET_TRACKERS', payload: null});

        //redirect to login page
        window.location.href = '/login';
    }

    return {logout};

}