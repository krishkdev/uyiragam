import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import styles from "../styles/Carousel.module.css";
import Image from "next/image";
import BannerImage_1 from "../public/CarouselImage.1.jpg";
import BannerImage_2 from "../public/CarouselImage.2.jpg";
import BannerImage_3 from "../public/CarouselImage.3.jpg";

const MyCarousel = () => {
  return (
    <div className={styles.carousel_wrapper}>
      <Carousel autoPlay={true} interval={3000} showStatus={false}>
        <div className={styles.carousel_main}>
          <Image src={BannerImage_1} alt="Slide 1" className={styles.bannerimage} />
         
        </div>
        <div className={styles.carousel_main}>
          <Image src={BannerImage_2} alt="Slide 2"  className={styles.bannerimage} />
          
        </div>
        <div className={styles.carousel_main}>
          <Image src={BannerImage_3} alt="Slide 3"  className={styles.bannerimage} />
      
        </div>
        <div className={styles.carousel_main}>
          <Image src={BannerImage_1} alt="Slide 4"  className={styles.bannerimage} />
 
        </div>
        <div className={styles.carousel_main}>
          <Image src={BannerImage_3} alt="Slide 5"  className={styles.bannerimage} />
 
        </div>
      </Carousel>
    </div>
  );
};

export default MyCarousel;
