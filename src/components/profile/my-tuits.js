import {useEffect, useState} from "react";
import * as service from "../../services/tuits-service";
import Tuits from "../tuits";
import {Link} from "react-router-dom";

const MyTuits = () => {
    const [tuits, setTuits] = useState([]);
    const findMyTuits = () =>
        service.findTuitsByUser("me")
            .then(tuits => setTuits(tuits));
    useEffect(findMyTuits, []);
    const deleteTuit = (tid) =>
        service.deleteTuit(tid)
            .then(findMyTuits);
    if (!tuits.length) {
        return (
            <div>
                <h5>Looks like you haven't posted anything yet</h5>
                <Link to="/profile" classname='nav-link active'>
                    Back to profile
                </Link>
            </div>
        )
    }
    return(
        <div>
            <h3>My Tuits</h3>
            <Link to="/profile" classname='nav-link active'>
                Back to profile
            </Link>
            <br/>
            <Tuits tuits={tuits}
                   deleteTuit={deleteTuit}
            />
        </div>
    );
};

export default MyTuits;