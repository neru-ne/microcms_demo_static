import { metaDataType } from '@/app/types/Utils'

let DOMAIN = process.env.NEXT_PUBLIC_SITE_URL;
if (!DOMAIN) {
  DOMAIN = ""
}
const siteTitle = "microCMS x Next.jsデモサイト";

export const CommonMeta = (props: metaDataType) => {
  const { title, description, url, type, imageUrl } = props
  return (
    <>
      <title>
        {
          title ? `${title} | ${siteTitle}` : `microCMS x Next.jsデモサイト`
        }
      </title>
      <meta name="description" content={description} />
      <meta property="og:title" content={
        title ? `${title} | ${siteTitle}` : `microCMS x Next.jsデモサイト`
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
