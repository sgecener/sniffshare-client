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
  const { setIsLoggedIn } = useAuthContext();
  const router = useRouter();

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
    <div>
      <div className="max-w-xl mx-auto">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6">
            <h1 className="text-2xl font-semibold title">User Profile</h1>
            <div className="content">
              <div className="mt-4">
                <strong>
                  <h3>{profile.user.username}</h3>
                </strong>
              </div>
              <div className="mt-2">
                {profile.user.first_name} {profile.user.last_name}
              </div>
              <div className="mt-2">{profile.user.email}</div>
            </div>
            <div className="footer mt-4">
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-300"
                onClick={() => {
                  deleteUserProfile(profile.user.id);
                  localStorage.removeItem("token");
                  setIsLoggedIn(false);
                  router.push("/register");
                }}
              >
                Delete Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
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
