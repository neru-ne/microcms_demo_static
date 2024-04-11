import axios from "axios";

const MICROCCMS_KEY = process.env.NEXT_PUBLIC_MICROCMS_KEY

const headers = {
  'Content-Type': 'application/json',
  'X-MICROCMS-API-KEY': MICROCCMS_KEY
}

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
