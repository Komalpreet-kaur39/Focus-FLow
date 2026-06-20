import "@/styles/globals.css";
import { TaskProvider } from '../context/TaskContext';
import Header from "../components/Header";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isAuthPage = router.pathname === "/login" || router.pathname === "/register";

  useEffect(() => {
    if (!mounted) return;

    const token = localStorage.getItem("token");
    if (!token && !isAuthPage && router.pathname !== "/") {
      router.replace("/login");
    } else if (token && isAuthPage) {
      router.replace("/task");
    }
  }, [mounted, router.pathname, isAuthPage]);

  // Prevent flash of protected content during initial mount / redirect check
  if (!mounted) {
    return null;
  }

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const isProtected = !isAuthPage && router.pathname !== "/";

  if (isProtected && !token) {
    return (
      <div className="app-container" style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div style={{ color: "#94a3b8", fontSize: "0.95rem" }}>Redirecting to login...</div>
      </div>
    );
  }

  return (
    <TaskProvider>
      <div className="app-container">
        {!isAuthPage && token && <Header />}
        <main className="main-content">
          <Component {...pageProps} />
        </main>
      </div>
    </TaskProvider>
  );
}
