import axios from "axios";
import { createClient } from 'microcms-js-sdk';
import type { MicroCMSQueries } from "microcms-js-sdk";
import type { itemListType, itemType, categoriesType } from '@/app/types/api'


const MICROCCMS_KEY = process.env.NEXT_PUBLIC_MICROCMS_KEY
const MICROCMS_DOMAIN = process.env.NEXT_PUBLIC_MICROCMS_DOMAIN
const headers = {
  'Content-Type': 'application/json',
  'X-MICROCMS-API-KEY': MICROCCMS_KEY
}

if (!MICROCCMS_KEY || !MICROCMS_DOMAIN) {
  throw new Error("Key Error");
}

const client = createClient({
  serviceDomain: MICROCMS_DOMAIN,
  apiKey: MICROCCMS_KEY,
});

/**
 * GETリクエスト
 */
export const getRequest = (
  url: any,
  params?:any
) => axios({
  headers,
  method: "get",
  url: url,
  params:params,
  timeout: 35000,
}).then((response) => {
  console.log(response)
  return response;
});


/**
 * 全件記事取得
 */
export const getAllItemList = async (
  queries?: MicroCMSQueries
) => {
  return await client.getAllContents<itemListType>({ endpoint: "item", queries });
}

/**
 * 記事取得
 */
export const getItemList = async (
  queries?: MicroCMSQueries
) => {
  return await client.get<itemListType>({ endpoint: "item", queries });
}

/**
 * 個別記事取得
 * @param contentId
 * @param queries
 * @returns
 */
export const getItem = async (
  contentId: string,
  queries?: MicroCMSQueries
) => {
  return await client.getListDetail<itemType>({
    endpoint: "item",
    contentId,
    queries,
  });
};

interface AllCategoryType {
  id: string;
  name: string;
  slug: string;
}
/**
 * 全件カテゴリー取得
 */
export const getCategory = async (
  queries?: MicroCMSQueries
) => {
  return await client.getAllContents<AllCategoryType>({ endpoint: "item_categories", queries });
}

/**
 * POSTリクエスト
 */
export const postRequest = (
  url: any,
  data:any,
  params?:any
) => axios({
  headers,
  method: "post",
  url: url,
  data:data,
  params:params,
  timeout: 35000,
}).then((response) => {
  console.log(response)

  return response;
});
