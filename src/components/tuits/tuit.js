import {React, useEffect, useState} from "react";
import TuitStats from "./tuit-stats";
import TuitImage from "./tuit-image";
import TuitVideo from "./tuit-video";
import * as likesService from '../../services/likes-service'

const Tuit = ({tuit, deleteTuit, likeTuit, dislikeTuit}) => {
    const [userLikedTuit, setUserLikedTuit] = useState(false);
    useEffect(() => {
        if (tuit) {
            likesService.findUserLikesTuit("me", tuit._id)
                .then(response => {
                    if (response) {
                        setUserLikedTuit(true);
                    }
                });
        }
    }, [])
    console.log(userLikedTuit);
  return(
    <li className="p-2 ttr-tuit list-group-item d-flex rounded-0">
      <div className="pe-2">
        {
          tuit.postedBy &&
          <img src={`../images/${tuit.postedBy.username}.jpg`}
               className="ttr-tuit-avatar-logo rounded-circle"/>
        }
      </div>
      <div className="w-100">
          <i onClick={() => deleteTuit(tuit._id)} className="fas fa-remove fa-2x fa-pull-right"></i>
        <h2
          className="fs-5">
          {tuit.postedBy && tuit.postedBy.username}
          @{tuit.postedBy && tuit.postedBy.username}</h2>
        {tuit.tuit}
        {
          tuit.youtube &&
            <TuitVideo tuit={tuit}/>
        }
        {
          tuit.image &&
          <TuitImage tuit={tuit}/>
        }
        <TuitStats tuit={tuit}
                   likeTuit={likeTuit}
                   dislikeTuit={dislikeTuit}
                   userLikedTuit={userLikedTuit}
        />
      </div>
    </li>
  );
}
export default Tuit;