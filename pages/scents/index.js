import { ScentCard } from "@/app/components/scent/card";
import { deleteScent, getScents } from "@/data/scents";
import { useState, useEffect } from "react";

export default function Scents() {
  const [scents, setScents] = useState([]);
  const [isOwner, setIsOwner] = useState(false);


  useEffect(() => {
    getScents().then((data) => {
      setScents(data);
    });
  }, []);

  const refresh = () => {
    getScents().then((data) => {
        setScents(data);
      });
  }

  const removeScent = (scentId) => {
    deleteScent(scentId).then(refresh);
  };

  return (
    <div>
      {scents.map((scent) => {
        return (
          <div>
            <ScentCard scent={scent} removeScent={removeScent} isOwner={isOwner}/>
          </div>
        );
      })}
    </div>
  );
}



Scents.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
    </Layout>
  );
};
