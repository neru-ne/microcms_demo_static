import { getItemList } from "@/app/api/index"
import { PageHeader } from '@/app/components/organisms/PageHeader'

import { MainContents } from '@/app/components/layouts/MainContents'
import { Archive } from "@/app/components/organisms/Archive";
import { PageNavi } from '@/app/components/atoms/navi/pageNavi'

import { Head } from '@/app/components/layouts/Head'

//types
import { metaDataType } from '@/app/types/Utils'

export default async function Item() {

  let apiParams = {
    limit: Number(process.env.NEXT_PUBLIC_ITEM_PER_PAGE),
    fields: 'id,name,category,kinds,price',
    offset:0
  };

  const itemList = await getItemList(apiParams);

  let errorFlg = false;
  if (!itemList) {
    errorFlg = true;
  }

  //meta
  const meta: metaDataType = {
    title: "商品一覧",
    description: "商品一覧のdescriptionです",
    url: "",
    type: "article",
  }

  return (
    <>
    <Head {...meta} />
      <PageHeader heading={true}>商品</PageHeader>
      <MainContents>
        {
          itemList && <Archive {...itemList} />
        }
        <PageNavi url="/item" itemList={itemList} />
      </MainContents>
    </>
  )
}
