import { getItemList, getCategory } from "@/app/api/index"
import { PageHeader } from '@/app/components/organisms/PageHeader'
import { MainContents } from '@/app/components/layouts/MainContents'

import { CommonButton } from "@/app/components/atoms/button/CommonButton";
import { PageNavi } from '@/app/components/atoms/navi/pageNavi'
import { Archive } from "@/app/components/organisms/Archive";
import { Head } from '@/app/components/layouts/Head'

//types
import { commonButtonType } from '@/app/types/components'
import { metaDataType } from '@/app/types/Utils'
import { selectActiveCategory } from '@/app/Utils/item/selectActiveCategory'

const PER_PAGE = Number(process.env.NEXT_PUBLIC_ITEM_PER_PAGE);

export async function generateStaticParams() {

  const apiParams = {
    fields: 'slug',
  };
  const posts = await getCategory(apiParams);

  return posts.map((post: any) => ({
    slug: post.slug,
  }))
}


export default async function Category({ params }: {
  params: { slug: string }
}) {
  const categoriesApiParams = {
    fields: 'id,name,slug',
  };
  const categories = await getCategory(categoriesApiParams);

  const activeCategory = selectActiveCategory(categories, params.slug)


  const backButton: commonButtonType = {
    mode: "link",
    linkHref: "/item",
    name: "Itemに戻る",
    blank: false,
    kinds: "primary",
  }

  let apiParams = {
    limit: Number(process.env.NEXT_PUBLIC_ITEM_PER_PAGE),
    fields: 'id,name,category,kinds,price',
    offset: 0,
    filters: activeCategory ? `category[contains]${activeCategory.id}` : ``
  };

  const itemList = await getItemList(apiParams);

  let errorFlg = false;
  if (!itemList) {
    errorFlg = true;
  }
  //meta
  const meta: metaDataType = {
    title: "商品一覧",
    description: activeCategory ? `カテゴリー${activeCategory.name}のdescriptionです` : ``
    ,
    url: "",
    type: "article",
  }

  return (
    <>
      <Head {...meta} />
      <PageHeader heading={true}>商品</PageHeader>
      <MainContents>
        {
          errorFlg && <>エラー</>
        }
        {
          !errorFlg && itemList && (
            <>
              <p className="font-bold text-xl mb-6">
                {activeCategory && `カテゴリー：${activeCategory.name}の商品`}
                </p>
              <Archive {...itemList} />
              <PageNavi url={`/item/category/${params.slug}`} itemList={itemList} />
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
