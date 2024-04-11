import { pageHeaderType } from '@/app/types/components'
import Link from "next/link"

export const PageHeader = (props: pageHeaderType) => {
  const { heading, children } = props;
  return (
    <>
      <div className='px-4 py-2'>
      <Link href="/" className='underline'>Topへ移動</Link>
    </div>
      <div className='bg-primary py-10'>
        <div className='mainContents'>
          {
            heading ? (
              <h1 className='font-bold text-5xl text-white'>{children}</h1>
            ) : (
              <p className='font-bold text-5xl text-white'>{children}</p>
            )
          }
        </div>
      </div >
    </>
  )
}
