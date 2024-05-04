import Layout from "@/app/components/layout";
import Navbar from "@/app/components/navbar";
import { ScentCard } from "@/app/components/scent/card";
import { useAppContext } from "@/context/state";
import { getUserProfile } from "@/data/auth";
import { useEffect } from "react";

export default function Favorites() {
    const { profile , setProfile, token} = useAppContext()

    useEffect(() => {
        getUserProfile().then((profileData) => {
          if (profileData) {
            if (token) {
            setProfile(profileData);
            }
          }
        });
      }, []);

      return (
        <>
          <h1>My Favorites</h1>
          <div>
            {profile.favorite_posts && profile.favorite_posts.length > 0 ? (
              profile.favorite_posts.map((favPost) => (
                <ScentCard
                  key={favPost.scent_post.id}
                  scent={favPost.scent_post}
                  isOwner={favPost.scent_post.is_owner}
                />
              ))
            ) : (
              <p>No favorite posts yet.</p>
            )}
          </div>
        </>
      );
    }
    

Favorites.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      <section className="container">{page}</section>
    </Layout>
  );
};
