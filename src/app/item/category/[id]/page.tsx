"use client"
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import useSWR from 'swr';
import { useRecoilState } from "recoil";
import { itemListAtom } from "@/app/recoil/itemListAtom";
import { categoriesAtom } from "@/app/recoil/categoriesAtom";
import { metaDataAtom } from '@/app/recoil/metaDataAtom'

import { getRequest } from "@/app/api/index"
import { PageHeader } from '@/app/components/organisms/PageHeader'
import { MainContents } from '@/app/components/layouts/MainContents'

import { CommonButton } from "@/app/components/atoms/button/CommonButton";
import { PageNavi } from '@/app/components/atoms/navi/pageNavi'
import { ErrorContentsArea } from '@/app/components/molecules/ErrorContentsArea'
import { Archive } from "@/app/components/organisms/Archive";

//Utils
import { selectActiveCategory } from '@/app/Utils/item/selectActiveCategory'

//types
import { commonButtonType } from '@/app/types/components'

const NEXT_PUBLIC_MICROCMS_URL = process.env.NEXT_PUBLIC_MICROCMS_URL


export default function Category() {

  const backButton: commonButtonType = {
    mode: "link",
    linkHref: "/item",
    name: "Itemに戻る",
    blank: false,
    kinds:"primary",
  }

  const [metaData, setMetaData] = useRecoilState(metaDataAtom);
  const [categoriesList, setCategoriesList] = useRecoilState(categoriesAtom);
  const [itemList, setItemList] = useRecoilState(itemListAtom);

  const [activeCategory, setActiveCategory] = useState<{
    id: string;
    name: string;
    slug: string;
  } | "">("");

  //metaデータの設定
  useEffect(() => {
    if (activeCategory) {
      const metaDataCopy = { ...metaData };
      metaDataCopy.title = `カテゴリー：${activeCategory.name}の商品`
      metaDataCopy.description = "カテゴリーページです";
      setMetaData(metaDataCopy);
    }
  }, [activeCategory])

  //URLから、どのカテゴリーページなのか判定
  const pathname = usePathname();
  const pageUrls = pathname.split('/');
  const len = pageUrls.length;

  const categorySlug = pageUrls[len - 1];

  useEffect(() => {
    if (categoriesList) {
      const activeCategory = selectActiveCategory(categoriesList, categorySlug);
      setActiveCategory(activeCategory)
    }
  }, [categoriesList])


  let params = {
    limit: process.env.NEXT_PUBLIC_ITEM_PER_PAGE,
    fields: 'id,name,category,kinds,price',
    filters: '',
    offset: 0,
  };
  const searchParams = useSearchParams();
  //ページ数入れ込み
  const paramsPage = searchParams.get("page");
  if (paramsPage) {
    params.offset = Number(paramsPage) - 1
  }

  //カテゴリーで絞り込み
  if (activeCategory) {
    params.filters = `category[contains]${activeCategory.id}`
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
          data && itemList && activeCategory && (
            <>
              <p className="font-bold text-xl mb-6">カテゴリー：{activeCategory.name}の商品</p>
              <Archive {...itemList} />
              <PageNavi url={`/item/category/${activeCategory.slug}`} />
            </>
          )
        }
        <div className="w-full flex justify-center mt-20">
          <CommonButton {...backButton} />
        </div>
      </MainContents>
    </>
  )
}
