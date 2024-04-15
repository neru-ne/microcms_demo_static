import { getItemList } from "@/app/api/index"
import { PageHeader } from '@/app/components/organisms/PageHeader'

import { MainContents } from '@/app/components/layouts/MainContents'
import { Archive } from "@/app/components/organisms/Archive";
import { PageNavi } from '@/app/components/atoms/navi/pageNavi'

import { Head } from '@/app/components/layouts/Head'

//types
import { metaDataType } from '@/app/types/Utils'


const PER_PAGE = Number(process.env.NEXT_PUBLIC_ITEM_PER_PAGE);


//page/2などのページを生成
export async function generateStaticParams() {
  const apiParams = {
    fields: 'id',
    offset: 0,
    limit: 0,
  };
  const posts = await getItemList(apiParams);

  const range = (start: number, end: number) =>
    [...Array(end - start + 1)].map((_, i) => start + i);

  const pathsRange = range(2, Math.ceil(Number(posts.totalCount) / PER_PAGE))

  const result = pathsRange.map((num) => ({
    page: `${num}`, //stringにしなければいけない
  }));
  return result;
}

export default async function ItemPage({ params }: { params: { page: number } }) {

  let apiParams = {
    limit: PER_PAGE,
    fields: 'id,name,category,kinds,price',
    offset: params.page -1
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
