import { useState, useEffect } from "react";
import { Select } from "@/app/components/form-elements";
import { ScentCard } from "@/app/components/scent/card";
import { getCategories, getScents } from "@/data/scents";

export default function Scents() {
  const [scents, setScents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("0");
  const [filteredScents, setFilteredScents] = useState([]);

  useEffect(() => {
    getCategories().then((catData) => setCategories(catData));
    getScents().then((data) => setScents(data));
  }, []);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    console.log("Selected Category:", event.target.value);
  };

  const filterScents = () => {
    if (selectedCategory !== "0") {
      const filtered = scents.filter((scent) => scent.category_id === parseInt(selectedCategory));
      setFilteredScents(filtered);
    } else {
      setFilteredScents(scents);
    }
  };

  useEffect(() => {
    filterScents();
  }, [scents, selectedCategory]);

  return (
    <div>
      <Select
        id="category"
        options={categories}
        title="All Categories"
        onChange={handleCategoryChange}
        value={selectedCategory}
      />
      <div>
        {filteredScents.map((scent) => (
          <div key={scent.id}>
            <ScentCard scent={scent} />
          </div>
        ))}
      </div>
    </div>
  );
}
