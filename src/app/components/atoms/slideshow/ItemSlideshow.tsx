import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

//types
import { itemSlideshowType } from '@/app/types/components';

export const ItemSlideshow = (props: itemSlideshowType) => {
  const {
    list, className, keyName,
  } = props;

  let slideOption = {
    modules: [Navigation, Pagination, Autoplay],
    navigation:true,
    pagination:{
      clickable: true
    },
    loop:false,
    autoplay:{
      delay: 3000,
    },
    spaceBetween:50,
    slidesPerView:1,
  }
  if (list.length < 1){
    slideOption.loop = true;
  }

  return (
    0 < list.length && (
      <Swiper
        {...slideOption}
        className={className}
      >
        {
          list.map((item, index) => {
            return (
              <SwiperSlide key={`${keyName}${index}`}>
                <img src={item.url} alt="" />
              </SwiperSlide>
            )
          })
        }
      </Swiper>
    )
  )
}
