import { useRouter } from "next/router";
import { useRef, useEffect, useState } from "react";
import { useAppContext } from "@/context/state";
import { editScent, getScentById } from "@/data/scents";
import ScentForm from "@/app/components/scent/form";
import Layout from "@/app/components/layout";
import Navbar from "@/app/components/navbar";

export default function EditScent() {
  const formEl = useRef();
  const router = useRouter();
  const [scent, setScent] = useState();
  const [tags, setTags] = useState([]);
  const { profile, token } = useAppContext();
  const { id } = router.query;

  useEffect(() => {
    if (id && profile) {
      getScentById(id).then((scentData) => {
        if (token) {
          if (scentData.is_owner) {
            setScent(scentData);
            const initialTags = scentData.tags
            setTags(initialTags);

          } else {
            router.back();
          }
        }
      });
    }
  }, [id, token, profile]);

  useEffect(() => {
    if (scent && formEl.current) {
      const { title, description, category } = formEl.current;
      title.value = scent.title;
      description.value = scent.description;
      category.value = scent.category_id;
    }
  }, [formEl, scent]);

  const handleSaveScent = (updatedScentData) => {
    editScent(id, updatedScentData, token)
      .then(() => router.push(`/scents/${id}`))
      .catch((error) => {
        console.error("Error editing scent:", error);
        // Display an error message to the user
      });
  };

  return (
    <ScentForm
      formEl={formEl}
      saveEvent={handleSaveScent}
      title="Edit scent"
      router={router}
      tags={tags}
      setTags={setTags}
    />
  );
}

EditScent.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
    </Layout>
  );
};