import Layout from "../app/components/layout";
import Navbar from "../app/components/navbar";
import Scents from "./scents";


export default function Index() {


  return (
    <div className="flex flex-wrap justify-center items-center -mb-4">
      <Scents />
    </div>
  );
  
}

Index.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
    </Layout>
  );
};
