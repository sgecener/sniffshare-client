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
            <div>{scent.title}</div>
            <div>{scent.description}</div>
            <div>{scent.created_at}</div>
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
