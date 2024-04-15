// 'use client';
import { PageHeader } from '@/app/components/organisms/PageHeader'
import { MainContents } from '@/app/components/layouts/MainContents'
import { ContactForm } from '@/app/components/molecules/ContactForm'

import { Head } from '@/app/components/layouts/Head'

//types
import { metaDataType } from '@/app/types/Utils'

export default function Contact() {

  //meta
  const meta: metaDataType = {
    title: "お問い合わせ",
    description: "お問い合わせのdescriptionです",
    url: "",
    type: "article",
  }

  return (
    <>
      <Head {...meta} />
      <PageHeader heading={true}>Contact</PageHeader>
      <MainContents>
        <ContactForm />
      </MainContents>
    </>
  )
}