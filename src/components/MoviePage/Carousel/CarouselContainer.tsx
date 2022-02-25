// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "./CarouselContainer.scss";
import { Lazy, Mousewheel } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/mousewheel";

import { FC, useEffect, useState } from "react";
import { Box } from "@mui/system";
import { Fade, Typography } from "@mui/material";

interface CarouselProps {
  cast: Array<object>;
}

const CarouselContainer: FC<CarouselProps> = ({ cast }) => {
  const [loadCast, setloadCast] = useState(true);
  const [imgIsLoad, setImgIsLoad] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setloadCast(false);
    }, 1500);
  });
  return (
    <Swiper
      modules={[Lazy, Mousewheel]}
      lazy={true}
      spaceBetween={10}
      slidesPerView={5}
      mousewheel={true}
      loop={true}
      style={{
        width: "55vw",
        marginLeft: 0,
        opacity: loadCast ? 0 : 1,
        transition: "1s opacity",
      }}
    >
      {cast
        .filter((item: any) => item.profile_path !== null)
        .map((actor: any, i: number) => {
          return (
            <SwiperSlide key={actor.id} style={{ width: "90%" }}>
              <Box sx={{ width: "90%" }}>
                <img
                  style={{ height: "25vh", border: "none", borderRadius: "5px" }}
                  className='swiper-lazy'
                  data-src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
                />
                <Typography sx={{ opacity: 0 }} className='swiper-lazy' data-src={null}>
                  {actor.original_name}
                </Typography>
              </Box>
            </SwiperSlide>
          );
        })}
    </Swiper>
  );
};

export default CarouselContainer;
