import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import { useAppContext } from "@/context/state";
import { getUserProfile } from "@/data/auth";
import { deleteScent, favoriteScent, unFavoriteScent } from "@/data/scents";

export function Detail({ scent, isOwner, cat }) {
  const { profile, setProfile } = useAppContext();
  const [isLiked, setIsLiked] = useState(false);
  const router = useRouter();

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
      router.push("/");
    });
  };

  useEffect(() => {
    const likedScent = profile.favorite_posts?.find(
      (x) => x.scent_post.id === scent.id
    );

    if (likedScent !== undefined) {
      setIsLiked(true);
    }
  }, [profile.favorite_posts, scent.id]);

  useEffect(() => {
    getUserProfile().then((profileData) => {
      if (profileData) {
        setProfile(profileData);
      }
    });
  }, [isLiked]);

  return (
    <>
      <div className="max-w-xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden mb-4">
        <div className="p-6">
          <div>
            <h1 className="text-2xl font-semibold mb-2">{scent.title}</h1>{" "}
            <span>
              {scent.category_id === cat.id ? <span>{cat.name}</span> : ""}
            </span>
          </div>
          <p className="text-gray-600">{scent.description}</p>
        </div>
        <div className="flex justify-between items-center p-6">
          <div className="mb-4">
            {isLiked ? (
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-300"
                onClick={unfavorite}
              >
                <span className="mr-2">
                  <i className="fas fa-heart-broken"></i>
                </span>
                Remove From Favorites
              </button>
            ) : (
              <button
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-300"
                onClick={favorite}
              >
                <span className="mr-2">
                  <i className="fas fa-heart"></i>
                </span>
                Add To Favorites
              </button>
            )}
          </div>
          {isOwner && (
            <div className="flex items-center">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mr-2 transition-colors duration-300"
                onClick={() => router.push(`/scents/${scent.id}/edit`)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-300"
                onClick={() => removeScent(scent.id)}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
