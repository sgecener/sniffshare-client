import { useRouter } from "next/router";
import { useRef, useEffect, useState } from "react";

import { useAppContext } from "@/context/state";
import { editScent, getScentById } from "@/data/scents";
import ScentForm from "@/app/components/scent/form";
import Layout from "@/app/components/layout";
import Navbar from "@/app/components/navbar";
import { getTagNameById, getTags } from "@/data/tags";

export default function EditScent() {
  const formEl = useRef();
  const router = useRouter();
  const [scent, setScent] = useState();
  const [scentTags, setScentTags] = useState([])
  const { profile, token } = useAppContext();
  const { id } = router.query;

  
  useEffect(() => {
    if (id && profile) {
      getScentById(id).then((scentData) => {
        if (token) {
          if (scentData.is_owner) {
            setScent(scentData);
          } else {
            router.back();
          }
        }
      });
    }
  }, [id, token]);

  useEffect(() => {
    if (scent) {
      const { title, description, category, tags } = formEl.current;

      title.value = scent.title;
      description.value = scent.description;
      category.value = scent.category_id;

      const tagIds = scent.tags.map((tag) => tag.id).join(", ");
      tags.value = tagIds;
    }
  }, [formEl, scent]);

  const saveScent = async () => {
    const { title, description, category, tags } = formEl.current;
    // Split the comma-separated tag IDs and trim any leading/trailing whitespace
    const tagIds = tags.value.split(",").map((id) => id.trim());

    try {
      // Create an array of tag objects with "id" and "name" keys
      const tagObjects = await Promise.all(
        tagIds.map(async (tagId) => {
          const tagName = await getTagNameById(tagId); // Await the Promise resolution
          return { id: parseInt(tagId), name: tagName };
        })
      );
  
      const scent = {
        title: title.value,
        description: description.value,
        category: category.value,
        tags: tagObjects,
      };
  
      editScent(id, scent, token)
        .then(() => router.push(`/scents/${id}`))
        .catch((error) => {
          console.error("Error editing scent:", error);
          // Display an error message to the user
        });
    } catch (error) {
      console.error("Error fetching tag objects:", error);
      // Display an error message to the user
    }
  };
  

  return (
    <ScentForm
      formEl={formEl}
      saveEvent={saveScent}
      title="Edit scent"
      router={router}
    ></ScentForm>
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
