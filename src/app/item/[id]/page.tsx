"use client"
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import useSWR from 'swr';
import { useRecoilState } from "recoil";
import { itemAtom } from "@/app/recoil/itemAtom";
import { metaDataAtom } from '@/app/recoil/metaDataAtom'
import parse from 'html-react-parser';

import { getRequest } from "@/app/api/index"
import { MainContents } from '@/app/components/layouts/MainContents'
import { PageHeader } from '@/app/components/organisms/PageHeader'

//atoms
import { CommonButton } from "@/app/components/atoms/button/CommonButton";
import { TagList } from "@/app/components/atoms/list/TagList";
import { CategoryList } from "@/app/components/atoms/list/CategoryList"
import { ItemSlideshow } from '@/app/components/atoms/slideshow/ItemSlideshow'

//molecules
import { ErrorContentsArea } from '@/app/components/molecules/ErrorContentsArea'
import { CustomerList } from '@/app/components/molecules/CutomerList'
import { RepeatContents } from '@/app/components/molecules/RepeatContents'

//types
import { commonButtonType } from '@/app/types/components'

const NEXT_PUBLIC_MICROCMS_URL = process.env.NEXT_PUBLIC_MICROCMS_URL


export default function ItemDetail() {

  const [metaData,setMetaData] = useRecoilState(metaDataAtom);

  const backButton: commonButtonType = {
    mode: "link",
    linkHref: "/item",
    name: "Itemに戻る",
    blank: false,
    kinds:"primary",
  }

  const params = {
    fields: 'id,name,category,kinds,price,default,custom,contents',
  };

  const pathname = usePathname();
  const pageUrls = pathname.split('/');
  const len = pageUrls.length;

  const detailId = pageUrls[len - 1];

  const [item, setItem] = useRecoilState(itemAtom);

  const { data, error } = useSWR([`${NEXT_PUBLIC_MICROCMS_URL}/item/${detailId}`, params], ([url, params]) => getRequest(url, params))

  useEffect(() => {
    if (data) {
      setItem(data.data);

      //metaデータの設定
        const metaDataCopy = {...metaData};
        metaDataCopy.title = data.data.name
        metaDataCopy.description = data.data.default.lead;
        setMetaData(metaDataCopy);
    }
  }, [data])

  return (
    <>
      <PageHeader heading={false}>商品</PageHeader>
      <MainContents>
        <ErrorContentsArea data={data} error={error} buttonSetting={backButton} />
        {
          data && item && (
            <>
              <CategoryList
                list={item.category} className="flex flex-wrap gap-2 mb-4" keyName="item-category-"
                link={true}
              />
              <h1 className="text-2xl font-bold">{item.name}</h1>
              <div className="flex flex-wrap gap-2 mt-4">

                <TagList
                  list={item.kinds}
                  className="flex flex-wrap gap-2"
                  keyName="item-kinds-"
                />
                <TagList
                  list={item.price}
                  className="flex flex-wrap gap-2"
                  keyName="item-price-"
                />
              </div>


              <div className='mt-4'>
                <p className="text-xl font-bold mb-2">{item.default.lead}</p>

                {/* slideshow */}
                {
                  item.default.img && 0 < item.default.img.length && (
                    <ItemSlideshow list={item.default.img} className="c-itemSlideshow mb-2" keyName="item-slideshow-" />
                  )
                }
                {
                  item.default.contents && (
                    <div className="">
                      {parse(item.default.contents)}
                    </div>
                  )
                }
                {/* お客様の声 */}
                {
                  item.custom && 0 < item.custom.body.length && (
                    <CustomerList list={item.custom.body} className="mt-8 mb-2" keyName="item-customerList-" />
                  )
                }
                {/* リピートコンテンツ */}
                {
                  item.contents && 0 < item.contents.length && (
                    <RepeatContents data={item.contents}  />
                  )
                }
              </div>
              <div className="w-full flex justify-center mt-20">
                <CommonButton {...backButton} />
              </div>
            </>
          )
        }
      </MainContents>
    </>
  )
}
