// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "./CarouselCastContainer.scss";
import { Lazy, Mousewheel } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/mousewheel";

import { FC, useEffect, useState } from "react";
import { Box } from "@mui/system";
import { Fade, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface CarouselProps {
  cast: Array<any>;
}

const CarouselCastContainer: FC<CarouselProps> = ({ cast }) => {
  const [loadCast, setloadCast] = useState(true);
  const [imgIsLoad, setImgIsLoad] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setloadCast(false);
    }, 1500);
  });
  return (
    <Swiper
      modules={[Lazy, Mousewheel]}
      lazy={true}
      spaceBetween={20}
      slidesPerView={2}
      mousewheel={true}
      className='swiper-wrapper'
      style={{
        opacity: loadCast ? 0 : 1,
        marginLeft: 0,
        transition: "1s opacity",
      }}
      breakpoints={{
        1200: {
          slidesPerView: 5,
          spaceBetween: 65,
        },
        1000: {
          slidesPerView: 4,
          spaceBetween: 65,
        },
        700: {
          slidesPerView: 5,
          spaceBetween: 90,
        },
        300: {
          slidesPerView: 3,
          spaceBetween: 50,
        },
      }}>
      {!loadCast &&
        cast
          .filter((item: any) => item.profile_path !== null && item.gender !== 0)
          .map((actor: any, i: number) => {
            return (
              <SwiperSlide key={actor.id} style={{ width: "90%" }}>
                <Box
                  sx={{ width: "90%", cursor: "pointer" }}
                  onClick={() => navigate(`/person/${actor.id}`)}>
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

export default CarouselCastContainer;
