import { useRouter } from 'next/router'
import { useRef, useEffect, useState } from 'react'
import Layout from '../../../components/layout'
import Navbar from '../../../components/navbar'

import { useAppContext } from '@/context/state'
import { getScentById } from '@/data/scents'
import ScentForm from '@/app/components/scent/form'

export default function EditScent() {
  const formEl = useRef()
  const router = useRouter()
  const [scent, setScent] = useState()
  const { profile } = useAppContext()
  const { id } = router.query

  useEffect(() => {
    if (id && profile) {
      getScentById(id).then(scentData => {
        if (scentData) {
          if (scentData.store.id === profile.store?.id) {
            setScent(scentData)
          } else {
            router.back()
          }
        }
      })
    }
  }, [id, scent])

  useEffect(() => {
    if (scent) {
      const { title, description,  category, tags } = formEl.current

      title.value = scent.title
      description.value = scent.description
      category.value = scent.category.id
      tags.value = scent.tags.id
    }
  }, [formEl, scent])


  const saveScent = () => {
    const { name, description, category, tags} = formEl.current

    const tagObject = {
        id: tags.value // Assuming tags.value is the id value
      };

    const scent = {
      name: name.value,
      description: description.value,
      category_id: category.value,
      tags: [tagObject]
    }

    editProduct(id, scent).then(() => router.push(`/scents/${id}`))
  }

  return (
    <ScentForm
      formEl={formEl}
      saveEvent={saveScent}
      title="Add a new product"
      router={router}
    ></ScentForm>
  )
}

NewProduct.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
    </Layout>
  )
}
