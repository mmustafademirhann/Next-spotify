import { RiMusic2Fill } from "react-icons/ri";
import { IoAddCircleOutline, IoCheckmarkCircle } from "react-icons/io5";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { apiService } from "../utils/api";
import { useAuthStore } from "../store/useAuthStore";

interface IProps {
  images: any;
  id: bigint;
  altTitle: string;
  heading: string;
  subheading?: string;
  imageRounded?: boolean;
  type: string;
}

export default function CardItem({
  images,
  id,
  altTitle,
  heading,
  subheading = "",
  imageRounded = false,
  type,
}: IProps) {
  const thumbnailRef = useRef<HTMLImageElement>();
  const { isAuthenticated } = useAuthStore();
  const [inLibrary, setInLibrary] = useState(false);
  const [loading, setLoading] = useState(false);

  // Check if item is in library on component mount
  useEffect(() => {
    if (!isAuthenticated) return;
    
    const checkLibraryStatus = async () => {
      try {
        let response;
        if (type === "playlist") {
          response = await apiService.playlists.isInLibrary(id);
        } else if (type === "album") {
          response = await apiService.albums.isInLibrary(id);
        }
        if (response) {
          setInLibrary(response.data);
        }
      } catch (error) {
        console.error("Error checking library status:", error);
      }
    };

    checkLibraryStatus();
  }, [id, type, isAuthenticated]);

  const handleToggleLibrary = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent card navigation
    if (!isAuthenticated || loading) return;
    
    setLoading(true);
    const wasInLibrary = inLibrary;
    
    // Optimistic update
    setInLibrary(!wasInLibrary);
    
    try {
      if (type === "playlist") {
        if (wasInLibrary) {
          await apiService.playlists.removeFromLibrary(id);
        } else {
          await apiService.playlists.addToLibrary(id);
        }
      } else if (type === "album") {
        if (wasInLibrary) {
          await apiService.albums.removeFromLibrary(id);
        } else {
          await apiService.albums.addToLibrary(id);
        }
      }
    } catch (error) {
      console.error("Error toggling library:", error);
      // Revert optimistic update on error
      setInLibrary(wasInLibrary);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Link href={`/${type}/${id}`} passHref>
      <div className="relative transition duration-300 p-4 rounded cursor-pointer hover:bg-[#282828] bg-paper group">
        {/* Library add/remove button, only for playlist and album */}
        {(type === "playlist" || type === "album") && isAuthenticated && (
          <button
            onClick={handleToggleLibrary}
            disabled={loading}
            className={`absolute bottom-3 right-3 z-10 text-2xl text-white opacity-80 hover:scale-110 hover:opacity-100 focus:outline-none transition-all ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            aria-label={inLibrary ? "Kütüphaneden çıkar" : "Kütüphaneye ekle"}
          >
            {inLibrary ? <IoCheckmarkCircle className="text-primary" /> : <IoAddCircleOutline className="text-gray-400 group-hover:text-white" />}
          </button>
        )}
        {images && images.length > 0 && images[0]?.url ? (
          <img
            src={images[0].url}
            alt={altTitle}
            ref={thumbnailRef}
            className={`object-cover w-full h-36  ${
              imageRounded ? "rounded-full" : "rounded"
            }`}
          />
        ) : (
          <div className="w-full h-36 flex items-center justify-center bg-gray-800 rounded">
            <RiMusic2Fill className="w-16 h-16 text-gray-400" />
          </div>
        )}
        <h3 className="mt-5 font-bold truncate">{heading}</h3>
        {subheading && (
          <h6 className="text-sm truncate text-gray">{subheading}</h6>
        )}
      </div>
    </Link>
  );
}
