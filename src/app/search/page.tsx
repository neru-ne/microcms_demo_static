"use client"
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { searchKeywordAtom } from "@/app/recoil/searchKeywordAtom";
import { searchKindsAtom, searchPriceAtom, searchKindsListAtom, searchPriceListAtom } from "@/app/recoil/search"
import { itemListAtom } from "@/app/recoil/itemListAtom";
import { metaDataAtom } from '@/app/recoil/metaDataAtom'

import { getRequest } from "@/app/api/index"
import { PageHeader } from '@/app/components/organisms/PageHeader'

import { MainContents } from '@/app/components/layouts/MainContents'
import { SearchForm } from '@/app/components/molecules/SearchForm'
import { SearchCheckForm } from "@/app/components/molecules/SearchCheckForm";

import { Archive } from "@/app/components/organisms/Archive";
import { Head } from '@/app/components/layouts/Head'

import { metaDataType } from '@/app/types/Utils'


const NEXT_PUBLIC_MICROCMS_URL = process.env.NEXT_PUBLIC_MICROCMS_URL


export default function Search() {


  const router = useRouter();

  //recoil
  const [itemList, setItemList] = useRecoilState(itemListAtom);
  const [searchKinds, setSearchKinds] = useRecoilState(searchKindsAtom);
  const [searchPrice, setSearchPrice] = useRecoilState(searchPriceAtom);
  const [searchKeyword, setSearchKeyword] = useRecoilState(searchKeywordAtom);
  const [searchKindsList, setSearchKindsList] = useRecoilState(searchKindsListAtom);
  const [searchPriceList, setSearchPriceList] = useRecoilState(searchPriceListAtom);
  const [metaData, setMetaData] = useRecoilState(metaDataAtom);

  //useState
  const [searchApplyFlg, setSearchApplyFlg] = useState<boolean>(false);
  const [searchKind, setSearchKind] = useState<"checkbox" | "keyword" | "">("");
  const [searchFlg, setSearchFlg] = useState<boolean>(false);
  const [searchWord, setSearchWord] = useState<string>("");
  const [searchFilters, setSearchFilters] = useState<string>("");
  const [searchFiltersText, setSearchFiltersText] = useState<string>("");
  const [resError, setResError] = useState<string>("");

  //metaデータの設定
  useEffect(() => {
    const metaDataCopy = { ...metaData };
    metaDataCopy.title = "Search"
    metaDataCopy.description = "searchページです";
    setMetaData(metaDataCopy);
  }, [])

  let params = {
    limit: 100,
    fields: 'id,name,category,kinds,price',
    filters: '',
    q: '',
  };
  const searchParams = useSearchParams();
  const paramsQ = searchParams.get("q");
  const paramsKinds = searchParams.get("kinds");
  const paramsPrice = searchParams.get("price");

  useEffect(() => {
    //初回時、URLにパラメータがついている時の処理
    if (paramsQ) {
      //キーワード検索
      setSearchWord(paramsQ);
      setSearchFlg(true);
      setSearchApplyFlg(true);
      setSearchKind("keyword");
    } else {
      //絞り込み検索
      if (paramsKinds || paramsPrice) {
        if (paramsKinds) {
          const paramsKindsArray = paramsKinds.split(',');
          setSearchKinds(paramsKindsArray);

          const searchKindsListCopy = searchKindsList.map(item => ({ ...item }));
          searchKindsListCopy.forEach((item) => {
            for (let i = 0; i < paramsKindsArray.length; i++) {
              if (item.name === paramsKindsArray[i]) {
                item.checked = item.checked ? false : true;
              }
            }
          })
          setSearchKindsList(searchKindsListCopy)

        }
        if (paramsPrice) {
          const paramsPriceArray = paramsPrice.split(',');
          setSearchPrice(paramsPriceArray);

          const searchPriceListCopy = searchPriceList.map(item => ({ ...item }));
          searchPriceListCopy.forEach((item) => {
            for (let i = 0; i < paramsPriceArray.length; i++) {
              if (item.name === paramsPriceArray[i]) {
                item.checked = item.checked ? false : true;
              }
            }
          })
          setSearchPriceList(searchPriceListCopy)

        }

        setSearchFlg(true);
        setSearchApplyFlg(true);
        setSearchKind("checkbox");

      }
    }
  }, [])

  /**
 * 絞り込み検索用のパラメータを返す
 * @returns
 */
  const returnreqParams = () => {
    let reqParams = "";
    let filterKinds = "";
    if (0 < searchKinds.length) {

      searchKinds.forEach((item, index) => {
        if (0 < index) {
          filterKinds = filterKinds + `[and]`
        }
        filterKinds = filterKinds + `kinds[contains]${item}`;
      });
      reqParams = filterKinds
    }

    let filterPrice = "";
    if (0 < searchPrice.length) {

      searchPrice.forEach((item, index) => {
        if (0 < index) {
          filterPrice = filterPrice + `[and]`
        }
        filterPrice = filterPrice + `price[contains]${item}`;
      });
      if (reqParams) {
        reqParams = `${reqParams}[and]${filterPrice}`
      } else {
        reqParams = `${filterPrice}`
      }
    }
    return reqParams;
  }
  /**
   * キーワード検索処理
   */
  const searchApply = () => {
    setSearchFlg(true);
    setSearchApplyFlg(true);
    setSearchWord(searchKeyword);
    setSearchKind("keyword");

    const params = new URLSearchParams();
    params.set('q', searchKeyword);
    const newParams = params.toString();
    router.push(`/search?${newParams}`);
  }

  /**
   * 絞り込み検索処理
   */
  const searchCheckboxApply = () => {

    setSearchKind("checkbox");
    const params = new URLSearchParams();

    if (0 < searchKinds.length) {
      params.set('kinds', searchKinds.join());
    }
    if (0 < searchPrice.length) {
      params.set('price', searchPrice.join());
    }

    setSearchFlg(true);
    setSearchApplyFlg(true);

    const newParams = params.toString();
    router.push(`/search?${newParams}`);
  }

  /**
   * 検索結果のコンポーネント
   * @returns
   */
  const FetchAndRender = () => {

    useEffect(() => {
      if (!searchKind || !searchApplyFlg) return;

      if (searchKind === "keyword") {
        params.q = searchWord;
      } else if (searchKind === "checkbox") {
        const reqParams = returnreqParams();
        setSearchFilters(reqParams)

        //検索結果テキスト入れ込み
        let titleText = "";
        if (0 < searchKinds.length) {
          titleText = `「種類：${searchKinds.join()}」`;
        }
        if (0 < searchPrice.length) {
          titleText = titleText + `「金額：${searchPrice.join()}」`;
        }
        setSearchFiltersText(titleText)

        params.filters = searchFilters;
      }

      getRequest(`${NEXT_PUBLIC_MICROCMS_URL}/item/`, params).then((res) => {
        if (res) {
          setItemList(res.data)
          setSearchApplyFlg(false);
        }
      }).catch((err) => {
        setResError(err)
        throw new Error("エラー：" + err);
      })
        .finally(() => {
          setSearchApplyFlg(false);
        })
    }, [searchWord, searchFilters])

    return (
      <>
        {
          itemList && (
            <>
              <div className="mt-20">
                <h2 className="font-bold text-2xl mb-4">
                  {
                    searchKind === "keyword" && searchWord && <>「{searchWord}」の検索結果</>
                  }
                  {
                    searchKind === "checkbox" && searchFilters && <>{searchFiltersText}の検索結果</>
                  }
                </h2>
                <Archive {...itemList} />
              </div>
            </>
          )
        }
        {
          resError && <><p className="mt-20 text-center">予期せぬエラーが発生しました</p></>

        }
      </>
    )
  }

  //meta
  const meta: metaDataType = {
    title: "検索",
    description: "検索のdescriptionです",
    url: "",
    type: "article",
  }

  return (
    <>
      <Head {...meta} />
      <PageHeader heading={true}>検索</PageHeader>
      <MainContents>
        <SearchForm onClick={searchApply} />
        <div className="mt-10">
          <SearchCheckForm onClick={searchCheckboxApply} />
        </div>
        <div>
          {searchFlg && <FetchAndRender />}
        </div>
      </MainContents>
    </>
  )
}
