import { tagListType } from '@/app/types/components'

export const TagList = (props: tagListType) => {

  const {
    list,
    className,
    keyName,
  } = props;

  return (
    0 < list.length && (
      <div className={className}>
        {
          list.map((item, index) => {
            return (
              <span key={`${keyName}${index}`}>
                #{item}
              </span>
            )
          })
        }
      </div>
    )
  )
}