import { useEffect, useState } from 'react';
import CardLayout from '../card-layout';
import { Textarea, Select, Input } from '../form-elements';
import { getCategories } from '@/data/scents';
import { getTags } from '@/data/tags';

export default function ScentForm({ formEl, saveEvent, title, router }) {
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    getCategories().then(catData => setCategories(catData));
  }, []);

  useEffect(() => {
    getTags().then(tagData => setTags(tagData));
  }, []);

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
          <label className="block text-sm font-medium text-gray-700 mb-2">Add Tags</label>
          <Select
            id="tags"
            options={tags}
            title="Select a Tag"
            addlClass="mb-4"
          />
        </div>
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
