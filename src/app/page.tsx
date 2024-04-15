import Link from 'next/link';
import { MainContents } from '@/app/components/layouts/MainContents'
import { Head } from '@/app/components/layouts/Head'

import { metaDataType } from '@/app/types/Utils'

export default function Home() {

  //meta
  const meta: metaDataType = {
    url: "",
    type: "website",
  }

  return (
    <main>
      <Head {...meta} />
      <MainContents>
        HOME
        <ul>
          <li><Link href='/item' className='underline'>item</Link></li>
          <li><Link href='/search' className='underline'>search</Link></li>
          <li><Link href='/contact' className='underline'>contact</Link></li>

        </ul>
      </MainContents>
    </main>
  );
}
