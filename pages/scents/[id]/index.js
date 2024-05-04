import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../../app/components/layout";
import Navbar from "../../../app/components/navbar";
import { Detail } from "../../../app/components/scent/detail";
import { getScentById } from "@/data/scents";

export default function ScentDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [scent, setScent] = useState({});

  const refresh = () => {
    getScentById(id).then((scentData) => {
      if (scentData) {
        setScent(scentData);
      }
    });
  };

  // const like = () => {
  //     likeProduct(id).then(refresh)
  //   }

  //   const unlike = () => {
  //     unLikeProduct(id).then(refresh)
  //   }

  useEffect(() => {
    if (id) {
      refresh();
    }
  }, [id]);

  return (
    <div className="columns is-centered">
      <div className="column">
        <Detail scent={scent} isOwner={scent.is_owner} />
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
