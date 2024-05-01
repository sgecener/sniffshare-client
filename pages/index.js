import Layout from "../app/components/layout";
import Navbar from "../app/components/navbar";

export default function Index() {
  return (
    <div>
      <h1>Hellö wOrld?</h1>
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
