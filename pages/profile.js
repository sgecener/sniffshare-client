import CardLayout from "@/app/components/card-layout";
import Layout from "@/app/components/layout";
import Navbar from "@/app/components/navbar";
import { useAppContext } from "@/context/state";
import { getUserProfile } from "@/data/auth";
import { useEffect } from "react";



export default function Profile() {
    const {profile, setProfile, token} = useAppContext()

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
            <h1>User Profile</h1>
            <div>{profile.user.username}</div>
        </CardLayout>
    )
}

Profile.getLayout = function getLayout(page) {
    return (
      <Layout>
        <Navbar />
        <section className="container">{page}</section>
      </Layout>
    );
  };
  