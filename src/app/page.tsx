"use client"
import { useEffect } from "react";
import Link from 'next/link';
import { useRecoilState } from "recoil";
import { metaDataAtom } from '@/app/recoil/metaDataAtom'
import { MainContents } from '@/app/components/layouts/MainContents'

export default function Home() {

  const [metaData,setMetaData] = useRecoilState(metaDataAtom);
  //metaデータの設定
  useEffect(()=>{
    const metaDataCopy = {...metaData};
    metaDataCopy.type = "website";
    setMetaData(metaDataCopy);
  },[])

  return (
    <main>
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
