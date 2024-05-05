import CardLayout from "@/app/components/card-layout";
import Layout from "@/app/components/layout";
import Navbar from "@/app/components/navbar";
import { useAuthContext } from "@/context/auth";
import { useAppContext } from "@/context/state";
import { deleteUserProfile, getUserProfile } from "@/data/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Profile() {
  const { profile, setProfile, token } = useAppContext();
  const { setIsLoggedIn } = useAuthContext()
  const router = useRouter();

  useEffect(() => {
    getUserProfile().then((profileData) => {
      if (profileData) {
        if (token) {
          console.log(profileData);
          setProfile(profileData);
        }
      }
    });
  }, []);

  return (
    <CardLayout>
      <h1 className="title">User Profile</h1>
      <div className="content">
        <div>
          <strong>
            <h3>{profile.user.username}</h3>
          </strong>
        </div>
        <div>
          {profile.user.first_name} {profile.user.last_name}
        </div>
        <div>{profile.user.email}</div>
        <div className="footer">
          <button
            onClick={() => {
              deleteUserProfile(profile.user.id);
              localStorage.removeItem("token");
              setIsLoggedIn(false)
              router.push("/register");
            }}
          >
            Delete Profile
          </button>
        </div>
      </div>
    </CardLayout>
  );
}

Profile.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      <section className="container">{page}</section>
    </Layout>
  );
};
