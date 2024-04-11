import Link from "next/link";
import { TagList } from "@/app/components/atoms/list/TagList";
import { CategoryList } from "@/app/components/atoms/list/CategoryList"

import { itemListType } from '@/app/types/api'

export const Archive = (props: itemListType) => {
  return (
    <>
      {
        0 < props.contents.length ? (
          <ul className="grid gap-4 grid-cols-3">
            {
              props.contents.map((item, index) => (
                <li className='list-none rounded-xl border-solid bg-[#fbfbfb] shadow-md' key={`itemList-${index}`}>
                  <Link href={`/item/${item.id}`} className="p-4 block">
                    <p className="text-lg font-bold mb-2">{item.name}</p>
                    <CategoryList
                      list={item.category} className="flex flex-wrap gap-2" keyName="item-category-"
                      link={false}
                    />
                    <TagList
                      list={item.kinds}
                      className="mt-2 flex flex-wrap gap-2"
                      keyName="item-kinds-"
                    />
                    <TagList
                      list={item.price}
                      className="flex flex-wrap gap-2"
                      keyName="item-price-"
                    />
                  </Link>
                </li>
              ))
            }
          </ul>
        )
          : (
            <>
              <p className="text-center my-4">記事はありません</p>
            </>
          )
      }
    </>
  )
}
