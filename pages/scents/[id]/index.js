import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../../app/components/layout";
import Navbar from "../../../app/components/navbar";
import { Detail } from "../../../app/components/scent/detail";
import { getCategoryById, getReviewByPostId, getScentById } from "@/data/scents";

export default function ScentDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [scent, setScent] = useState({});
  const [category, setCategory] = useState({});
  const [review, setReview] = useState({})

  const refresh = () => {
    getScentById(id).then((scentData) => {
      if (scentData) {
        setScent(scentData);
        // Fetch category using the category_id from scentData
        getCategoryById(scentData.category_id).then((catData) => {
          setCategory(catData);
        }).catch(error => {
          console.error("Error fetching category:", error);
        });
        getReviewByPostId(scentData.id).then((reviewData) => {
          setReview(reviewData)
        })

      }
    }).catch(error => {
      console.error("Error fetching scent:", error);
    });
  };
  
  useEffect(() => {
  if (id) {
    refresh()
  }
}, [id]);

useEffect(() => {
})

  return (
    <div className="columns is-centered">
      <div className="flex flex-wrap justify-center items-center -mb-4 py-10">
        <Detail scent={scent} isOwner={scent.is_owner} cat={category} review={review} />
        {/* <Ratings
              refresh={refresh}
              number_purchased={product.number_purchased}
              ratings={product.ratings}
              average_rating={product.average_rating}
              likes={product.likes}
            /> */}
      </div>
    </div>
  );
}

ScentDetail.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
    </Layout>
  );
};
