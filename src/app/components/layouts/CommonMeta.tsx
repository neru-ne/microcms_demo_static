'use client'

import { usePathname } from "next/navigation";

type Props = {
  title: string
  description: string
  url: string
  type: string
  imageUrl: string
}

let DOMAIN = process.env.NEXT_PUBLIC_SITE_URL;
if (!DOMAIN) {
  DOMAIN = ""
}
const siteTitle = "microCMS x Next.jsデモサイト";

export const CommonMeta = (props: Props) => {

  const pathname = usePathname();

  const { title, description, url, type, imageUrl } = props
  return (
    <>
      <title>{
        pathname === "/" ? `${title}` : `${title} | ${siteTitle}`
      }</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={
        pathname === "/" ? `${title}` : `${title} | ${siteTitle}`
      } />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:type" content={type} />
      {/* <meta property="og:image" content={imageUrl} /> */}

      <meta property="og:site_name" content={title} />

      {/* twitter */}
      {/* <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@RememberMovie" />
      <meta name="twitter:domain" content="remember-movie.style01.net" />
      <meta name="twitter:url" content={imageUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} /> */}


      {/* <link rel="canonical" href={url} /> */}

      {/* shortcut icon */}
      {/* <link rel="shortcut icon" href={`${DOMAIN}/assets/images/android-touch-icon.png`} />
      <link rel="apple-touch-icon" href={`${DOMAIN}/assets/images/apple-touch-icon.png`} /> */}
    </>
  )
}
