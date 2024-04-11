'use client';
import { PageHeader } from '@/app/components/organisms/PageHeader'
import { MainContents } from '@/app/components/layouts/MainContents'
import { ContactForm } from '@/app/components/molecules/ContactForm'

export default function Contact() {


  return (
    <>
      <PageHeader heading={true}>Contact</PageHeader>
      <MainContents>
        <ContactForm/>
      </MainContents>
    </>
  )
}