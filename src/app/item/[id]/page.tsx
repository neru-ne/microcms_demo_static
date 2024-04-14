import parse from 'html-react-parser';
import { getAllItemList, getItem } from "@/app/api/index"
import { MainContents } from '@/app/components/layouts/MainContents'
import { PageHeader } from '@/app/components/organisms/PageHeader'

//atoms
import { CommonButton } from "@/app/components/atoms/button/CommonButton";
import { TagList } from "@/app/components/atoms/list/TagList";
import { CategoryList } from "@/app/components/atoms/list/CategoryList"
import { ItemSlideshow } from '@/app/components/atoms/slideshow/ItemSlideshow'

//molecules
import { CustomerList } from '@/app/components/molecules/CutomerList'
import { RepeatContents } from '@/app/components/molecules/RepeatContents'

import { Head } from '@/app/components/layouts/Head'

//types
import { commonButtonType } from '@/app/types/components'
import { metaDataType } from '@/app/types/Utils'


//事前に全ての記事を取得
export async function generateStaticParams() {
  const apiParams = {
    fields: 'id',
  };
  const posts = await getAllItemList(apiParams);

  return posts.map((post:any) => ({
    id: post.id,
  }))
}

//generateStaticParamsからidが送られてくるので、それを使って個別記事を取得
export default async function ItemDetail(
  { params }: { params: { id: string } }
  ) {

  const apiParams = {
    fields: 'id,name,category,kinds,price,default,custom,contents',
  };

  const item = await getItem(params.id, apiParams);

  let errorFlg = false;
  if(!item) {
    errorFlg = true;
  }


  const backButton: commonButtonType = {
    mode: "link",
    linkHref: "/item",
    name: "Itemに戻る",
    blank: false,
    kinds:"primary",
  }

  //meta
  const meta: metaDataType = {
    title: item ? item.name : "",
    description: item ? item.default.lead : "リード文がない記事",
    url: "",
    type: "article",
  }

  return (
    <>
      <Head {...meta} />
      <PageHeader heading={false}>商品</PageHeader>
      <MainContents>
        {
          errorFlg && <>エラー</>
        }
        {
          !errorFlg &&item && (
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
