import Link from 'next/link'
// import { useRecoilState } from 'recoil';
// import { itemListAtom } from '@/app/recoil/itemListAtom';

import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

import type { itemListType, itemType } from '@/app/types/api'


export const PageNavi = (props: { url: string, itemList: itemListType }) => {

  const {itemList} = props;

  const PER_PAGE = Number(process.env.NEXT_PUBLIC_ITEM_PER_PAGE);//1ページにおける表示数
  const STEP = 2;//現在のページの前後表示数

  if (!itemList) return;

  const totalCount = Number(itemList.totalCount);//全記事
  const offset = Number(itemList.offset);//現在のページ数

  const range = (start: number, end: number) =>
    [...Array(end - start + 1)].map((_, i) => start + i);

  let maxPage = Math.ceil(totalCount / PER_PAGE); //全ページ数
  let firstPage = (offset) - STEP; // 表示する最初のページ
  let lastPage = (offset) + STEP;//表示する最後のページ

  let firstFlg = false;//・・・と最初のリンクを表示するかどうか
  let lastFlg = false;//・・・と最後のリンクを表示するかどうか

  if (firstPage <= 0) {
    firstPage = 1
    firstFlg = false;
  } else {
    if (1 < firstPage) {
      firstFlg = true;
    } else {
      firstFlg = false;
    }
  };

  if (maxPage <= lastPage) {
    lastPage = maxPage
    lastFlg = false;
  } else {
    lastFlg = true
  };

  return (
    <>
      <div className='flex justify-center'>
        <ul className='flex gap-4 mt-1 c-pageNavi'>
          {
            0 < offset && <li className='flex bg-white rounded-md shadow-md '><Link href={1 === offset ? `${props.url}` :`${props.url}/page/${offset}`} className='flex items-center px-3 py-2'><FaAngleLeft/></Link></li>
          }
          {
            firstFlg && (
              <>
                <li className='flex bg-white rounded-md shadow-md'><Link href={`${props.url}`} className='flex items-center px-3 py-2'>1</Link></li>
                <li className='flex bg-white items-center'>...</li>
              </>
            )
          }
          {range(firstPage, lastPage).map((number, index) => (
            <li key={`page-navi-${index}`} className={`flex bg-white rounded-md shadow-md ${number === (offset + 1) ? 'is-current' : ''}`}>
              {
                number === (offset + 1) ? <span className='flex items-center px-3 py-2'>{number}</span> : <Link href={1 === number ? `${props.url}` : `${props.url}/page/${number}`} className='flex items-center px-3 py-2'>{number}</Link>
              }
              {/* <Link href={`${props.url}/page/${number}`} className='flex items-center px-3 py-2'>{number}</Link> */}
              {/* href={1 === (offset - 1) ? `${props.url}` : `${props.url}/page/${offset - 1}`} */}
            </li>
          ))}
          {
            lastFlg && (
              <>
                <li className='flex bg-white items-center'>...</li>
                <li className='flex bg-white rounded-md shadow-md'><Link href={`${props.url}/page/${maxPage}`} className='flex items-center px-3 py-2'>{maxPage}</Link></li>
              </>
            )
          }
          {
            (offset + 1) < maxPage && <li className='flex bg-white rounded-md shadow-md '><Link href={`${props.url}/page/${offset + 2}`} className='flex items-center px-3 py-2'><FaAngleRight/></Link></li>
          }
        </ul>
      </div>
    </>
  )
}
