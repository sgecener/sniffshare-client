import { useEffect, useState } from 'react';
import CardLayout from '../card-layout';
import { Textarea, Select, Input } from '../form-elements';
import { getCategories } from '@/data/scents';
import { getTags } from '@/data/tags';

export default function ScentForm({ formEl, saveEvent, title, router }) {
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState(''); // State for tag input

  useEffect(() => {
    getCategories().then(catData => setCategories(catData));
  }, []);

  const handleTagInputChange = (event) => {
    setTagInput(event.target.value);
  };

  const handleAddTag = () => {
    if (tagInput.trim() !== '') {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  // const handleSave = () => {
  //   // Save tags to the database
  //   saveTags(tags).then(() => {
  //     // Proceed with other save events or navigation
  //     saveEvent();
  //   }).catch(error => {
  //     // Handle error
  //     console.error('Error saving tags:', error);
  //   });
  // };


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
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleAddTag}
          >
            Add Tag
          </button>
        </div>
        {/* Display added tags */}
        {tags.map((tag, index) => (
          <div key={index} className="flex items-center mb-2">
            <span className="mr-2">{tag}</span>
            <button
              type="button"
              className="text-red-600 hover:text-red-800"
              onClick={() => handleRemoveTag(tag)}
            >
              Remove
            </button>
          </div>
        ))}
      </form>
      <div className="flex justify-end">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          onClick={saveEvent}
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
