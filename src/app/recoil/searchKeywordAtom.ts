import { atom } from "recoil";

export const searchKeywordAtom = atom<string | ''>({
  key: 'searchKeywordAtom',
  default: '',
});
