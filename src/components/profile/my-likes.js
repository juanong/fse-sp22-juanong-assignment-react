import Tuits from "../tuits";
import * as service from "../../services/likes-service";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

const MyLikes = () => {
    const [likedTuits, setLikedTuis] = useState([]);
    const findTuitsILike = () =>
        service.findAllTuitsLikedByUser("me")
            .then((tuits) => setLikedTuis(tuits));
    useEffect(findTuitsILike, []);

    return(
        <div>
            <h3>My Likes</h3>
            <Link to="/profile" classname='nav-link active'>
                Back to profile
            </Link>
            <Tuits tuits={likedTuits}
                   refreshTuits={findTuitsILike}/>
        </div>
    );
};
export default MyLikes;