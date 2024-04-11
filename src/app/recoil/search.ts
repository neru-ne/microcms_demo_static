import { atom } from "recoil";

type searchCheckboxListType = {
  id:string,
  name:string,
  checked:boolean,
}

export const searchKindsListAtom = atom<searchCheckboxListType[]>({
  key: 'searchKindsListAtom',
  default: [
    {
      id: "kind-0",
      name:"食べ物",
      checked:false,
    },
    {
      id: "kind-1",
      name: "飲み物",
      checked: false,
    }
  ],
});
export const searchKindsAtom = atom<string[] | []>({
  key: 'searchKindsAtom',
  default: [],
});


export const searchPriceListAtom = atom<searchCheckboxListType[]>({
  key: 'searchPriceListAtom',
  default: [
    {
      id: "price-0",
      name: "高い",
      checked: false,
    },
    {
      id: "price-1",
      name: "まあまあ",
      checked: false,
    },
    {
      id: "price-2",
      name: "安い",
      checked: false,
    }
  ],
});
export const searchPriceAtom = atom<string[] | []>({
  key: 'searchPriceAtom',
  default: [],
});
