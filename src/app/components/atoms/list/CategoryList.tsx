import Link from "next/link"
import { categoryListType } from '@/app/types/components'

export const CategoryList = (props: categoryListType) => {

  const {
    list,
    className,
    keyName,
    link,
  } = props;

  return (
    0 < list.length && (
      <div className={className}>
      {
        list.map((itemCategory, index) => {
          return (
            link ?
              <Link href={`/item/category/${itemCategory.slug}`} className={`bg-primary text-white px-2 py-1 text-[12px] rounded-lg ${itemCategory.slug}`} key={`${keyName}${index}`}>
                {itemCategory.name}
              </Link>
              :
              <span className={`bg-primary text-white px-2 py-1 text-[12px] rounded-lg ${itemCategory.slug}`} key={`${keyName}${index}`}>
                {itemCategory.name}
              </span>
          )

        })
      }
    </div>
    )
  )

}
