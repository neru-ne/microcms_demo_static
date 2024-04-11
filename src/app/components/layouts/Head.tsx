import { useRecoilState } from 'recoil';
import { metaDataAtom } from '@/app/recoil/metaDataAtom'
import { CommonMeta } from "@/app/components/layouts/CommonMeta"

export function Head() {

  const [metaData,setMetaData] = useRecoilState(metaDataAtom);
  return (
    <CommonMeta {...metaData} />
  )
}
