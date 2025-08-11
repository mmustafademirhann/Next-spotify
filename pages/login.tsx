import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Layout from "../components/Layout";
import { useAuthStore } from "../store/useAuthStore";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  
  const { login, register, error: authError, loading: authLoading } = useAuthStore();
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let success = false;
    
    if (isRegister) {
      success = await register(username, password, email);
    } else {
      success = await login(username, password);
    }

    if (success) {
      router.push("/");
    }
  };

  return (
    <Layout title={isRegister ? "Register for Spotify Clone" : "Log in to Spotify Clone"}>
      <div className="flex flex-col items-center justify-center w-screen h-screen gap-8">
        <Image
          src="/images/spotify_logo.png"
          alt="spotify logo"
          width={320}
          height={96}
          objectFit="contain"
          priority
        />
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="px-4 py-2 border rounded-md bg-gray-800 text-white border-gray-600 focus:border-green-500 focus:outline-none"
            required
          />
          
          {isRegister && (
            <input
              type="email"
              placeholder="Email (optional)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-2 border rounded-md bg-gray-800 text-white border-gray-600 focus:border-green-500 focus:outline-none"
            />
          )}
          
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-2 border rounded-md bg-gray-800 text-white border-gray-600 focus:border-green-500 focus:outline-none"
            required
          />
          
          {authError && (
            <div className="text-red-500 text-sm text-center">{authError}</div>
          )}
          
          <button
            type="submit"
            disabled={authLoading}
            className="px-12 py-2 text-lg tracking-widest uppercase rounded-full focus:outline-none bg-primary hover:bg-opacity-80 disabled:opacity-50"
          >
            {authLoading ? "Loading..." : (isRegister ? "Register" : "Login")}
          </button>
          
          <button
            type="button"
            onClick={() => setIsRegister(!isRegister)}
            className="text-sm text-gray-400 hover:text-white underline"
          >
            {isRegister ? "Already have an account? Login" : "Don't have an account? Register"}
          </button>
        </form>
      </div>
    </Layout>
  );
}
