"use client"
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { categoriesAtom } from "@/app/recoil/categoriesAtom";
import { getRequest } from "@/app/api/index"
import { jsonParse } from '@/app/Utils'

const NEXT_PUBLIC_MICROCMS_URL = process.env.NEXT_PUBLIC_MICROCMS_URL

export const SetOption = () => {
  const [categoriesList, setCategoriesList] = useRecoilState(categoriesAtom);

  const params = {
    limit: 100,
  };

  useEffect(() => {
    const data = sessionStorage.getItem('categories');
    if (data) {
      setCategoriesList(jsonParse(data));
    } else {
      getRequest(`${NEXT_PUBLIC_MICROCMS_URL}/item_categories/`, params).then((data) => {
        setCategoriesList(data.data);
        sessionStorage.setItem("categories",jsonParse(data.data));
      })
    }
  }, [])

  return <></>
}
