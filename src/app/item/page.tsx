"use client"
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import useSWR from 'swr';
import { useRecoilState } from "recoil";
import { itemListAtom } from "@/app/recoil/itemListAtom";
import { metaDataAtom } from '@/app/recoil/metaDataAtom'

import { getRequest } from "@/app/api/index"
import { PageHeader } from '@/app/components/organisms/PageHeader'

import { MainContents } from '@/app/components/layouts/MainContents'
import { Archive } from "@/app/components/organisms/Archive";
import { ErrorContentsArea } from '@/app/components/molecules/ErrorContentsArea'
import { PageNavi } from '@/app/components/atoms/navi/pageNavi'

const NEXT_PUBLIC_MICROCMS_URL = process.env.NEXT_PUBLIC_MICROCMS_URL

export default function Item() {

  const [metaData,setMetaData] = useRecoilState(metaDataAtom);
  //metaデータの設定
  useEffect(()=>{
    const metaDataCopy = {...metaData};
    metaDataCopy.title = "Item"
    metaDataCopy.description = "itemページです";
    setMetaData(metaDataCopy);
  },[])

  const [itemList, setItemList] = useRecoilState(itemListAtom);

  let params = {
    limit: process.env.NEXT_PUBLIC_ITEM_PER_PAGE,
    fields: 'id,name,category,kinds,price',
    offset:0
  };

  const searchParams = useSearchParams();
  const paramsPage = searchParams.get("page");
  if (paramsPage){
    params.offset = Number(paramsPage) - 1
  }

  const { data, error } = useSWR([`${NEXT_PUBLIC_MICROCMS_URL}/item/`, params], ([url, params]) => getRequest(url, params))


  useEffect(() => {
    if (data) {
      setItemList(data.data);
    }
  }, [data])


  return (
    <>
      <PageHeader heading={true}>商品</PageHeader>
      <MainContents>
        <ErrorContentsArea data={data} error={error} />
        {
          data && itemList && <Archive {...itemList} />
        }
        <PageNavi url="/item" />
      </MainContents>
    </>
  )
}
