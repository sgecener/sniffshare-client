import { useRouter } from "next/router";
import { useRef, useState } from "react";
import Layout from "../../app/components/layout";
import Navbar from "../../app/components/navbar";
import { addScent } from "@/data/scents";
import ScentForm from "@/app/components/scent/form";

export default function NewScent() {
  const formEl = useRef();
  const router = useRouter();

  const [tags, setTags] = useState([]);

  const handleSaveScent = (scentData) => {
    addScent(scentData).then(() => router.push("/"));
  };

  return (
    <div className="flex justify-center items-center bg-white rounded-lg mt-10 py-8 px-4 max-w-md mx-auto">
      <ScentForm
        formEl={formEl}
        saveEvent={handleSaveScent}
        tags={tags}
        setTags={setTags}
        router={router}
      />
    </div>
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
