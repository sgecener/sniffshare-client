import { useState, useEffect, useCallback } from "react";
import { Select } from "@/app/components/form-elements";
import { ScentCard } from "@/app/components/scent/card";
import { getCategories, getScents } from "@/data/scents";
import "../../styles/animation.css"

export default function Scents() {
  const [scents, setScents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("0");
  const [latestPost, setLatestPost] = useState({});
  const [filteredScents, setFilteredScents] = useState([]);

  useEffect(() => {
    getCategories().then((catData) => setCategories(catData));
    getScents().then((data) => setScents(data));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      refreshData();
    }, 5000);

    return () => clearInterval(interval);
  }, [latestPost]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filterScents = useCallback(() => {
    if (selectedCategory !== "0") {
      const filtered = scents.filter(
        (scent) => scent.category_id === parseInt(selectedCategory)
      );
      setFilteredScents(
        filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      );
    } else {
      setFilteredScents(
        scents.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      );
    }
  }, [scents, selectedCategory]);

  useEffect(() => {
    filterScents();
  }, [filterScents, scents, selectedCategory]);

  const refreshData = async () => {
    try {
      const newScents = await getScents();
      const sortedScents = newScents.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      const latestScent = sortedScents[0]; // Get the most recent scent
      setScents(newScents);
      setLatestPost(latestScent); // Set the latestPost to the most recent scent
    } catch (error) {
      console.error("Error fetching scents:", error);
    }
  };



  return (
    <div className="py-7">
      <Select
        id="category"
        options={categories}
        title="All Categories"
        onChange={handleCategoryChange}
        value={selectedCategory}
      />
      <div className="flex flex-col gap-4 overflow-auto py-7">
        {filteredScents.map((scent, index) => (
          <ScentCard
            key={`${scent.id}-${index}`}
            {...scent}
            scent={scent}
          />
        ))}
      </div>
    </div>
  );
}
