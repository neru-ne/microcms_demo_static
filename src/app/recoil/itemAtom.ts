import { atom } from "recoil";
import { itemType } from "@/app/types/api"

export const itemAtom = atom<itemType | ''>({
  key: 'itemAtom',
  default: '',
});