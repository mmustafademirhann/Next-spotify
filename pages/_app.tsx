import { AppProps } from "next/app";
import { useRouter } from "next/router";
import nProgress from "nprogress";
import { useEffect } from "react";
import Header from "../components/Header";
import PlayerTwo from "../components/PlayerTwo";
import PreviewPlayer from "../components/PreviewPlayer";
import Sidebar from "../components/Sidebar";

import ProtectedRoute from "../components/ProtectedRoute";
import { useAuthStore } from "../store/useAuthStore";
import "../styles/globals.css";
import "../styles/nonTailwind.css";

nProgress.configure({
  showSpinner: false,
});

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { checkAuth } = useAuthStore();

  // Initialize authentication check
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    const handleStart = (url: string) => {
      nProgress.start();
    };
    const handleStop = () => {
      nProgress.done();
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);

  return (
    <>
      {router.pathname === "/login" ? (
        <Component {...pageProps} />
      ) : (
        <ProtectedRoute>
          <Sidebar />
          <div className="flex flex-col ml-64">
            <Header />
            <main className="mt-4 ml-4">
              <Component {...pageProps} />
            </main>
          </div>
          {/* <PlayerTwo /> */}
          <PreviewPlayer />
        </ProtectedRoute>
      )}
    </>
  );
}

export default MyApp;
