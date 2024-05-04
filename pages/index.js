import Layout from "../app/components/layout";
import Navbar from "../app/components/navbar";
import Scents from "./scents";


export default function Index() {


  return (
    <div>
      <h1>Scents</h1>
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
