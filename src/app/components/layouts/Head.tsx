import { CommonMeta } from "@/app/components/layouts/CommonMeta"
import { metaDataType } from '@/app/types/Utils'

export function Head(props: metaDataType) {
  return (
    <CommonMeta {...props} />
  )
}
