import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import TrandingCard from "../TrandingCard/TrandingCard";
import { Autoplay } from "swiper";
import "swiper/css";

function Tranding(props) {
  const tranding = props.data.filter((item) => item.isTrending);
  const maxWidth = window.innerWidth;
  const [itemsPerview, setItemsPerview] = React.useState("3.5");

  React.useEffect(() => {
    if (maxWidth <= 475) {
      setItemsPerview("1");
    } else if (maxWidth <= 768) {
      setItemsPerview("1.5");
    } else {
      setItemsPerview("2.5");
    }
  }, [window]);

  return (
    <>
      <h2 className="tranding__title heading">Trending</h2>
      <Swiper
        scrollbar={{
          hide: true,
        }}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        slidesPerView={itemsPerview}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay]}
        className="mySwiper"
      >
        {tranding.map((item) => {
          return (
            <SwiperSlide key={item.id}>
              <TrandingCard
                title={item.title}
                thumbnail={item.thumbnail.regular.medium}
                year={item.year}
                category={item.category}
                rating={item.rating}
                id={item.id}
                bookmark={item.isBookmarked}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}

export default Tranding;
