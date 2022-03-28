import Tuits from "../tuits";
import * as service from "../../services/dislikes-service"
import {useEffect, useState} from "react"
import {Link} from 'react-router-dom'

const MyDislikes = () => {
    const [dislikedTuits, setDislikedTuits] = useState([]);
    const findTuitsIDislike = () =>
        service.findAllTuitsDislikedByUser("me")
            .then(tuits => setDislikedTuits(tuits));
    useEffect(findTuitsIDislike, []);

    return (
        <div>
            <h3>My Dislikes</h3>
            <Link to="/profile" classname='nav-link active'>
                Back to profile
            </Link>
            <br/>
            <Tuits tuits={dislikedTuits} refreshTuits={findTuitsIDislike}/>
        </div>
    )
}

export default MyDislikes;