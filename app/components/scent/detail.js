import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import { useAppContext } from "@/context/state";
import { getUserProfile } from "@/data/auth";
import {
  deleteScent,
  favoriteScent,
  getScentReviews,
  unFavoriteScent,
} from "@/data/scents";

export function Detail({ scent, isOwner, cat, review }) {
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
            <header className="text-2xl font-semibold mb-2">
              {scent.title}{" "}
              <span>
                {cat.id === scent.category_id ? (
                  <span className="bg-stone-600 text-white rounded-md px-3 py-1 text-base font-normal text-end">
                    {cat.name}
                  </span>
                ) : (
                  ""
                )}
              </span>
            </header>{" "}
          </div>
          <p className="text-gray-600 mt-6">{scent.description}</p>
        </div>
        <div className="text-sm italic mx-11">Comments</div>
        <div className="bg-gray-100 rounded-lg shadow-lg overflow-hidden mx-9">
          
          <div className="p-4">
            <div className="text-gray-600">
              <div className="text-sm italic">{review.comment}</div>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center p-6">
          <div className="mb-4">
            {isLiked ? (
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-300 mt-4"
                onClick={unfavorite}
              >
                <span>
                  <i className="fas fa-heart-broken"></i>
                </span>
                Remove From Favorites
              </button>
            ) : (
              <button
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-300"
                onClick={favorite}
              >
                <span>
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
