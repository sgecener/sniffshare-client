import Head from "next/head";
import { AppWrapper } from "../../context/state";

export default function Layout({ children }) {
  return (
    <AppWrapper>
      <>
        <Head>
          <title>Sniffshare</title>
        </Head>
        <main className="container">{children}</main>
      </>
    </AppWrapper>
  );
}
