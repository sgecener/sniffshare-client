import { AuthProvider } from "@/context/auth";
import '../styles/globals.css'

export default function Sniffshare({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);

return (
    <AuthProvider>
      <div className="flex justify-center min-h-screen pt-16">
        <div className="w-full max-w-4xl px-4">{getLayout(<Component {...pageProps} />)}</div>
      </div>
    </AuthProvider>
  );
}
