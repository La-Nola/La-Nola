import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import 'swiper/css/effect-fade';
// import required modules
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import Button from "./Button";
// Images
// import Babyclothing from "../../assets/img/baby-clothing.jpg";
// import candles from "../../assets/img/candles.jpg";
// import postcard from "../../assets/img/postcard.jpg";
import kidsClothesSliderBg from "../../localDataBase/images/Stories/DSCN4138 - Kopie.JPG";
import postcard from "../../localDataBase/images/Stories/DSC07377.JPG";
import candlesSliderBg from "../../localDataBase/images/Stories/DSC00118.JPG";
import { Link } from "react-router-dom";

const AwesomeSlider = () => {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        className="mySwiper text-primary h-swiper"
        effect="fade"
      >
        <SwiperSlide className="after:absolute after:w-full after:h-full after:left-0 after:top-0 after:bg-gradient-to-t after:from-neutral-900 [&>div]:text-white">
          <div className="absolute md:inset-y-96 md:inset-x-72 md:w-40  z-50 md:p-12 top-1/2 left-1/4 text-center">
            <p className="md:text-6xl	text-2xl pb-4">Kinderkleidung</p>
            <Link to={`/kidsclothes`}>
              {/* link to directe users to kidsclothes url */}
              <Button />
            </Link>
          </div>
          <img
            className="object-cover h-full w-full"
            src={kidsClothesSliderBg}
            alt="baby"
          />
        </SwiperSlide>
        ,
        <SwiperSlide className="after:absolute after:w-full after:h-full after:left-0 after:top-0 after:bg-gradient-to-t after:from-neutral-900 [&>div]:text-white">
          <div className="absolute  md:right-72 md:top-96  md:w-40  z-50 md:p-12 text-center top-1/2 right-1/4 mr-10">
            <p className="md:text-6xl	text-2xl pb-4">Postkarten</p>
            <Link to={`/postcards`}>
              {/* link to directe users to postCards url */}
              <Button />
            </Link>
          </div>
          <img
            className="object-cover h-full w-full"
            src={postcard}
            alt="postcard"
          />
        </SwiperSlide>
        <SwiperSlide className="after:absolute after:w-full after:h-full after:left-0 after:top-0 after:bg-gradient-to-t after:from-neutral-900 [&>div]:text-white">
          <div className="absolute md:inset-y-96 md:inset-x-72  md:w-40  z-50 md:p-12 top-1/2 left-1/4 text-center">
            <p className="md:text-6xl	text-2xl pb-4">Kerzen</p>
            <Link to={`/candles`}>
              {/* link to directe users to postCards url */}
              <Button />
            </Link>{" "}
          </div>
          <img
            className="object-cover h-full w-full"
            src={candlesSliderBg}
            alt="candles"
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
};
export default AwesomeSlider;
