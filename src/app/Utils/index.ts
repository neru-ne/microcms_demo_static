/**
 * 日付を整形して返す
 * @param date
 * @returns
 */
export const formatedDate = (date:string) => {
  const dateList = date.split('T');
  const data = dateList[0];
  const result = data.replaceAll("-","/");

  return result;

}

/**
 * オブジェクトをjsonに、jsonをオブジェクトに変換する
 */
export const jsonParse = (data:string | object) => {
  switch (typeof(data)) {
    case "object":
      return JSON.stringify(data);
    case "string":
      return JSON.parse(data);
    default:
      return data;
  }
}
