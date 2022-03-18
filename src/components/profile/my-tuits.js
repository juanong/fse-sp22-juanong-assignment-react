import {useEffect, useState} from "react";
import * as service from "../../services/tuits-service";
import Tuits from "../tuits";

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
            <h5>Looks like you haven't posted anything yet</h5>
        )
    }
    return(
        <Tuits tuits={tuits}
               deleteTuit={deleteTuit}
        />
    );
};

export default MyTuits;