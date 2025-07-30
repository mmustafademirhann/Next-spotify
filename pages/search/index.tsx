import { useEffect, useState } from "react";
import CardItem from "../../components/CardItem";
import CardItemGrid from "../../components/CardItemGrid";
import Heading from "../../components/Heading";
import Layout from "../../components/Layout";
import { apiService } from "../../utils/api";
import { useAuthStore } from "../../store/useAuthStore";

export default function Search() {
  const [categories, setCategories] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    const fetchCategories = async () => {
      if (!isAuthenticated) return;
      
      try {
        // For now, we'll use a mock data structure since backend might not have categories
        // You can replace this with actual backend endpoint when available
        const mockCategories = {
          categories: {
            items: [
              {
                id: "pop",
                name: "Pop",
                icons: [{ url: "/images/pop.jpg" }]
              },
              {
                id: "rock",
                name: "Rock",
                icons: [{ url: "/images/rock.jpg" }]
              },
              {
                id: "jazz",
                name: "Jazz",
                icons: [{ url: "/images/jazz.jpg" }]
              }
            ]
          }
        };
        setCategories(mockCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError('Failed to load categories');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [isAuthenticated]);

  if (loading) {
    return (
      <Layout title="Spotify Clone - Search">
        <div className="flex items-center justify-center h-64">
          <div className="text-white">Loading categories...</div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout title="Spotify Clone - Search">
        <div className="flex items-center justify-center h-64">
          <div className="text-white">{error}</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Spotify Clone - Search">
      <Heading text="Browse Categories" />

      <CardItemGrid>
        {categories?.categories?.items?.map((category) => (
          <CardItem
            key={category.id}
            altTitle={category.name}
            heading={category.name}
            id={category.id}
            images={category.icons}
            type="genre"
          />
        ))}
      </CardItemGrid>
    </Layout>
  );
}


