import { atom } from "recoil";
import { metaDataType } from '@/app/types/Utils'

let DOMAIN = process.env.NEXT_PUBLIC_SITE_URL;
if (!DOMAIN) {
  DOMAIN = ""
}
const siteTitle = "microCMS x Next.jsデモサイト";
const ogp = `${DOMAIN}/assets/images/OGP.jpg`;

export const metaDataAtom = atom<metaDataType>({
  key: 'metaDataAtom',
  default: {
    title: siteTitle,
    description: '共通のディスクリプションです',
    url: DOMAIN,
    type: "article",
    imageUrl: ogp,
  },
});
