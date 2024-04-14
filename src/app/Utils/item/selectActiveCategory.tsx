import { categoriesType } from '@/app/types/api'


type cateogryType = {
  id: string;
  name: string;
  slug: string;
}
/**
 * アクティブなカテゴリーを返す
 * @param data
 * @param slug
 * @returns
 */
export const selectActiveCategory = (data: cateogryType[] | any , slug: string) => {
  const contents = data;

  let returnData : {
    id: string;
    name: string;
    slug: string;
  } | "" = "";

  for (let i = 0; i < contents.length; i++) {
    const item = contents[i];
    if (item.slug === slug) {
      returnData = item;
      break;
    }
  }
  return returnData;
}
