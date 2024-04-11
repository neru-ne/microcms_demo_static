import { repeatContentsType } from '@/app/types/components'
import parse from 'html-react-parser';

import { ItemSlideshow } from '@/app/components/atoms/slideshow/ItemSlideshow'


export const RepeatContents = (props: repeatContentsType) => {
  const { data } = props;

  const selectField = (item:any) => {
      switch (item.fieldId) {
        case "gallery_col":
          return (
            item.gallery && 0 < item.gallery.length && (<ItemSlideshow list={item.gallery} className="c-itemSlideshow mb-2" keyName="item-slideshow-" />)
          );
        case "img_single_col":
          let css = "flex"
          if (item.layout[0] === "右：画像　左：文章") {
            css = css + " flex-row-reverse";
          }
          return (
            <div className={css}>
              <div className='w-[40%]'><img src={item.img.url} alt="" /></div>
              <div className='whitespace-pre-wrap w-[60%]'>{item.contents}</div>
            </div>
          )
        case "free_col":
          return parse(item.contents)
        case "img_col":
          //画像単体
          return <img src={item.img.url} alt="" />
        default:
          return <>default</>
      }
  }

  return (
        data.map((item, index) => {
          return (
            <div className='mt-4' key={`${item.fieldId}-${index}`}>{selectField(item)}</div>
          )
        })
    )
}
