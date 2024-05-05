import { useRouter } from "next/router";
import { useRef } from "react";
import Layout from "../../app/components/layout";
import Navbar from "../../app/components/navbar";
import { addScent } from "@/data/scents";
import ScentForm from "@/app/components/scent/form";

export default function NewScent() {
  const formEl = useRef();
  const router = useRouter();

  const saveScent = () => {
    const { title, description, category, tags } =
      formEl.current;

  
      
    const scent = {
      title: title.value,
      description: description.value,
      category: category.value,
      tags: tags.value
      
    };
    addScent(scent).then(() => router.push(`/`));
  };

  return (
    <ScentForm
      formEl={formEl}
      saveEvent={saveScent}
      title="Add A New Scent"
      router={router}
    ></ScentForm>
  );
}

NewScent.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
    </Layout>
  );
};