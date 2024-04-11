import { atom } from "recoil";
import { itemListType } from "@/app/types/api"

export const itemListAtom = atom<itemListType | ''>({
  key: 'itemListAtom',
  default: '',
});