import { useEffect, useState } from 'react'
import CardLayout from '../card-layout'
import { Textarea, Select, Input } from '../form-elements'
import { getCategories, getTags } from '@/data/scents'

export default function ScentForm({ formEl, saveEvent, title, router }) {
  const [categories, setCategories] = useState([])
  const [tags, setTags] = useState([])

  useEffect(() => {
    getCategories().then(catData => setCategories(catData))
  }, [])

  useEffect(() => {
    getTags().then(tagData => setTags(tagData))
  }, [])



  return (
    <CardLayout title={title}>
      <form ref={formEl}>
        <Input
          id="title"
          label="Title"
        />
        <Textarea
          id="description"
          label="Description"
        />
        <Select
          id="category"
          options={categories}
          label="Category"
          title="Select a Category"
        />
        <Select
          id="tags"
          options={tags}
          label="Tags"
          title="Select a Tag"
          
        />
      </form>
      <>
        <button className="card-footer-item" onClick={saveEvent}>Save</button>
        <button className="card-footer-item" onClick={() => router.back()}>Cancel</button>
      </>
    </CardLayout>
  )
}


