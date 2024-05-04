import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import { useAppContext } from "@/context/state";
import { getUserProfile } from "@/data/auth";
import { deleteScent, favoriteScent, unFavoriteScent } from "@/data/scents";

export function Detail({ scent, isOwner }) {
  const { profile, setProfile } = useAppContext();
  const [isLiked, setIsLiked] = useState(false);
  const router = useRouter()

  const favorite = () => {
    favoriteScent(scent.id).then(() => {
      setIsLiked(true);
    });
  };

  const unfavorite = () => {
    unFavoriteScent(scent.id).then(() => {
      setIsLiked(false);
    });
  };

  const removeScent = (scentId) => {
    deleteScent(scentId).then(() => {
      router.push("/")
    });
  };

  useEffect(() => {
    const likedScent = profile.favorite_posts?.find(x => x.scent_post.id === scent.id);
    
    if (likedScent !== undefined) {
    setIsLiked(true);  
    }
    
  }, [profile.favorite_posts , scent.id]);

  useEffect(() => {
    getUserProfile().then((profileData) => {
      if (profileData) {
        setProfile(profileData);
      }
    });
  }, [isLiked]);

  return (
    <>
      <div className="tile is-ancestor">
        <div className="tile is-parent is-vertical ">
          <article className="tile is-child">
            <h1 className="title">{scent.title}</h1>
            <p>{scent.description}</p>
          </article>
          <article className="tile is-child is-align-self-center">
            <div className="field is-grouped">
              <p className="control">
                {isLiked ? (
                  <button
                    className="button is-link is-outlined"
                    onClick={unfavorite}
                  >
                    <span className="icon is-small">
                      <i className="fas fa-heart-broken"></i>
                    </span>
                    <span>Remove From Favorites</span>
                  </button>
                ) : (
                  <button
                    className="button is-link is-outlined"
                    onClick={favorite}
                  >
                    <span className="icon is-small">
                      <i className="fas fa-heart"></i>
                    </span>
                    <span>Add To Favorites</span>
                  </button>
                )}
                {isOwner ? (
                  <footer className="card-footer">
                    <button onClick={() =>  {router.push(`/scent_posts/${scent.id}/edit`)}}>Edit</button>
                    <button
                      onClick={() => removeScent(scent.id)}
                      className="card-footer-item"
                    >
                      Delete
                    </button>
                  </footer>
                ) : (
                  <></>
                )}
              </p>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
