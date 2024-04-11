import { Fragment } from 'react';
import { useRecoilState } from "recoil";
import { searchKindsAtom, searchKindsListAtom, searchPriceListAtom, searchPriceAtom } from "@/app/recoil/search"

import { CommonButton } from "@/app/components/atoms/button/CommonButton";
import { CommonCheckbox } from "@/app/components/atoms/input/CommonCheckbox"
//types
import { commonButtonType, searchFormType, commonCheckboxType } from '@/app/types/components'

export const SearchCheckForm = (props: searchFormType) => {

  //recoil
  const [searchKinds, setSearchKinds] = useRecoilState(searchKindsAtom);
  const [searchKindsList, setSearchKindsList] = useRecoilState(searchKindsListAtom);
  const [searchPrice, setSearchPrice] = useRecoilState(searchPriceAtom);
  const [searchPriceList, setSearchPriceList] = useRecoilState(searchPriceListAtom);


  const applyButton: commonButtonType = {
    mode: "button",
    linkHref: "",
    name: "キーワード検索",
    blank: false,
    kinds:"primary",
    onClick: props.onClick
  }

  const changeKindInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget as HTMLInputElement;

    const searchKindsListCopy = searchKindsList.map(item => ({ ...item }));

    searchKindsListCopy.forEach((item) => {
      if (item.name === target.value) {
        item.checked = item.checked ? false : true;
      }
    })
    setSearchKindsList(searchKindsListCopy)


    const searchKindsCopy = [...searchKinds];
    const result = updateStates(target, searchKindsCopy)
    setSearchKinds(result)
  }

  const changePriceInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget as HTMLInputElement;
    const searchPriceCopy = [...searchPrice];

    const searchPriceListCopy = searchPriceList.map(item => ({ ...item }));
    searchPriceListCopy.forEach((item) => {
      if (item.name === target.value) {
        item.checked = item.checked ? false : true;
      }
    })
    setSearchPriceList(searchPriceListCopy)

    const result = updateStates(target, searchPriceCopy)
    setSearchPrice(result)
  }

  /**
   * stateの更新
   * @param target 
   * @param data 
   * @returns 
   */
  const updateStates = (target: HTMLInputElement, data: string[]) => {
    if (target.checked) {
      let setFlg = false;
      data.forEach((item) => {
        if (item === target.value) {
          setFlg = true;
        }
      })
      if (!setFlg) {
        data.push(target.value);
      }
    } else {
      let removeFlg = false;
      let targetIndex = 0;
      data.forEach((item, index) => {
        if (item === target.value) {
          removeFlg = true;
          targetIndex = index;
        }
      })
      if (removeFlg) {
        data.splice(targetIndex, 1);
      }
    }
    return data;
  }


  return (
    <div>
      <p className='font-bold text-xl mb-4'>絞り込み検索（AND）</p>
      <div className="flex flex-wrap gap-4 mb-4">
      {
        searchKindsList.map((item,index)=>{
          const option: commonCheckboxType = {
            name: "kind-checkbox",
            id: item.id,
            value: item.name,
            disabled: false,
            className: "",
            title: item.name,
            checked:item.checked,
            onChange: changeKindInput,
          }
          return (
            <Fragment key={`${index}`}><CommonCheckbox {...option} /></Fragment>
          )
        })
      }
      </div>
      <div className="flex flex-wrap gap-4">
        {
          searchPriceList.map((item, index) => {
            const option: commonCheckboxType = {
              name: "price-checkbox",
              id: item.id,
              value: item.name,
              disabled: false,
              className: "",
              title: item.name,
              checked: item.checked,
              onChange: changePriceInput
            }
            return (
              <Fragment key={`${index}`}><CommonCheckbox {...option} /></Fragment>
            )
          })
        }
      </div>

      <div className="mt-6">
        <CommonButton {...applyButton} />
      </div>
    </div>
  )

}
