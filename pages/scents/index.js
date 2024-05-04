import { ScentCard } from "@/app/components/scent/card";
import { getScents } from "@/data/scents";
import { useState, useEffect } from "react";

export default function Scents() {
  const [scents, setScents] = useState([]);


  useEffect(() => {
    getScents().then((data) => {
      setScents(data);
    });
  }, []);

  
  return (
    <div>
      {scents.map((scent) => {
        return (
          <div>
            <ScentCard scent={scent} />
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
