import Tuits from "../tuits";
import * as service from "../../services/likes-service";
import {useEffect, useState} from "react";

const MyLikes = () => {
    const [likedTuits, setLikedTuis] = useState([]);
    const findTuitsILike = () =>
        service.findAllTuitsLikedByUser("me")
            .then((tuits) => setLikedTuis(tuits));
    useEffect(findTuitsILike, []);

    return(
        <>
            <h3>My Likes</h3>
            <Tuits tuits={likedTuits}
                   refreshTuits={findTuitsILike}/>
        </>
    );
};
export default MyLikes;