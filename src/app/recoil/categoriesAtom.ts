import { atom } from "recoil";
import { categoriesType } from "@/app/types/api"

export const categoriesAtom = atom<categoriesType | ''>({
  key: 'categoriesAtom',
  default: '',
});
