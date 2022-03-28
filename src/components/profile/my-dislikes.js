import Tuits from "../tuits";
import * as service from "../../services/dislikes-service"
import {useEffect, useState} from "react"

const MyDislikes = () => {
    const [dislikedTuits, setDislikedTuits] = useState([]);
    const findTuitsIDislike = () =>
        service.findAllTuitsDislikedByUser("me")
            .then(tuits => setDislikedTuits(tuits));
    useEffect(findTuitsIDislike, []);

    return (
        <>
            <h3>My Dislikes</h3>
            <Tuits tuits={dislikedTuits} refreshTuits={findTuitsIDislike}/>
        </>
    )
}

export default MyDislikes;