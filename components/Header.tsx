import { useRouter } from "next/router";
import { AiOutlineUser } from "react-icons/ai";
import { MdLogout, MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { useAuthStore } from "../store/useAuthStore";
import { useSpotifyStore } from "../store/useSpotifyStore";
import CollectionTabs from "./CollectionTabs";
import SearchInput from "./SearchInput";

export default function Header() {
  const router = useRouter();
  const { user, logout: authLogout } = useAuthStore();
  const { setCurrentTrack } = useSpotifyStore();

  const handleLogout = () => {
    setCurrentTrack(null);
    authLogout();
    router.push("/login");
  };

  if (router.pathname === "/login") {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full p-4 pl-10 bg-[#111011]">
      <div className="flex items-center gap-10 w-[32rem]">
        <div className="flex items-center gap-3">
          <button
            className="flex items-center p-1 bg-[#0B0B0A] rounded-full focus:outline-none"
            onClick={() => router.back()}
          >
            <MdNavigateBefore className="text-2xl text-gray" />
          </button>

          <button className="flex items-center p-1 bg-[#0B0B0A] rounded-full focus:outline-none">
            <MdNavigateNext className="text-2xl text-gray" />
          </button>
        </div>

        <SearchInput />

        {router.pathname.includes("/collection") &&
          router.pathname !== "/collection/tracks" && <CollectionTabs />}
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3 py-2 pl-2 pr-4 bg-black rounded-full bg-opacity-70">
          <AiOutlineUser className="bg-[#333333] p-1 rounded-full text-2xl" />
          <span className="text-sm font-bold tracking-wide">
            {user?.username || 'User'}
          </span>
        </div>

        <div>
          <button
            className="flex items-center justify-center bg-black bg-opacity-70 rounded-full h-10 w-10 hover:bg-[#181818] focus:outline-none cursor-pointer"
            onClick={handleLogout}
          >
            <MdLogout />
          </button>
        </div>
      </div>
    </header>
  );
}
