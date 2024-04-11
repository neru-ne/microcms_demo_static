import Link from 'next/link'
import { commonButtonType } from '@/app/types/components'

export const CommonButton = (props: commonButtonType) => {
  const { mode, linkHref, name, blank, onClick, kinds } = props;

  return (
    mode === "button" ? (
      <button className={`c-button ${kinds}`} 
        onClick={() => {
          onClick && onClick();
        }}
      >{name}</button>
    ) : (
      blank ? (
        <Link className={`c-button ${kinds}`} href={linkHref} target='_blank' rel='noopener'
        onClick={() => {
          onClick && onClick();
        }}
      >{name}</Link>
      ): (
        <Link className={`c-button ${kinds}`}  href={linkHref} target=''
        onClick={() => {
          onClick && onClick();
        }}
      >{name}</Link>
      )
    )
  )
}