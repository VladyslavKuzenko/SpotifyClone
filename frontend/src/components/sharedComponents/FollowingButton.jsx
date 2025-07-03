import { useEffect, useState } from "react";
import { API_URL } from "../../js/properties/properties";
import { useAuth0 } from "@auth0/auth0-react";
import { isSubscribed } from "../../js/functions/functions";

export default function FollowAccountCard({userToFollow,styles}) {
    const {user,isAuthenticated,getAccessTokenSilently}=useAuth0();
      const [isFollowed, setIsFollowed] = useState(false);
    useEffect(()=>{
          const checkFollowed = async () => {
              if (isAuthenticated && user&&userToFollow) {
                const subscribed = await isSubscribed(user, userToFollow, getAccessTokenSilently);
                setIsFollowed(subscribed);
              }
            };
            checkFollowed();
    })
    const handleFollow = async () => {
   
        if(isAuthenticated){
          const token = await getAccessTokenSilently({
            authorizationParams: {
              audience: API_URL,
            },
          });
          const response = await fetch(
            `http://localhost:8080/users/follow/${user.sub}/${userToFollow.id}`,
            {
              method: isFollowed ? "DELETE" : "POST",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
    
          if (response.ok) {
            setIsFollowed(!isFollowed);
          } else {
            console.error("Failed to follow/unfollow the artist");
          }
        }
      }

      return(
              <button className={styles} onClick={handleFollow}>{isFollowed?'Unfollow':'Follow'}</button>
      )
}