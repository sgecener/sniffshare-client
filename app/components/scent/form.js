import { useEffect, useState } from 'react';
import CardLayout from '../card-layout';
import { Textarea, Select, Input } from '../form-elements';
import { getCategories } from '@/data/scents';
import { deleteScentTagById, getScentTagById } from '@/data/tags';

export default function ScentForm({ formEl, saveEvent, title, router, tags, setTags }) {
  const [categories, setCategories] = useState([]);
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    getCategories().then(catData => setCategories(catData));
  }, []);

  const handleTagInputChange = (event) => {
    setTagInput(event.target.value);
  };

  const handleAddTag = () => {
    try {
      if (tagInput.trim() !== '') {
        const newTag = {
          name: tagInput.trim()
        };
        setTags([...tags, newTag]);
        setTagInput('');
      }
    } catch (error) {
      console.error('Error adding tag:', error);
    }
  };

  const handleRemoveTag = (tagIndex) => {
    setTags(tags.filter((_, index) => index !== tagIndex));
  };

  const handleSaveScent = () => {
    if (formEl.current) {
      const { title, description, category } = formEl.current;
      const tagValues = tags.map(tag => ({name: tag.name}));
      
      const scent = {
        title: title.value,
        description: description.value,
        category: category.value,
        tags: tagValues,
      };
      saveEvent(scent);
    }
  };

  return (
    <CardLayout title={title}>
      <form ref={formEl} className="space-y-6">
        <div>
          <Input
            id="title"
            label="Title"
            placeholder="Enter title..."
            addlClass="mb-4"
          />
        </div>
        <div>
          <Textarea
            id="description"
            label="Description"
            placeholder="Enter description..."
            addlClass="mb-4"
          />
        </div>
        <div>
          <Select
            id="category"
            options={categories}
            label="Category"
            title="Select a Category"
            addlClass="mb-4"
          />
        </div>
        <div>
          
          <Input
            id="tagInput"
            label="Add Tags"
            placeholder="Enter tags..."
            value={tagInput}
            onChange={handleTagInputChange}
            addlClass="mb-4"
          />
          {tags.map((tag, index) => (
          <div key={index} className="flex items-center mb-2">
            <span className="mr-2">{tag.name}</span>
            <button
              type="button"
              className="text-red-600 hover:text-red-800"
              onClick={() => handleRemoveTag(index) }
            >
              Remove
            </button>
          </div>
        ))}
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => handleAddTag()}
          >
            Add Tag
          </button>
        </div>
      </form>
      <div className="flex justify-end">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          onClick={handleSaveScent}
        >
          Save
        </button>
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
          onClick={() => router.back()}
        >
          Cancel
        </button>
      </div>
    </CardLayout>
  );
}
