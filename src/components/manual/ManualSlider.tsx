'use client';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useState } from 'react';
import Slider from 'react-slick';
import Image from 'next/image';

interface Props {
  images: string[];
}

export default function ManualSlider({ images }: Props) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    beforeChange: (current: number, next: number) => setCurrentSlide(next),
  };

  return (
    <div className="mx-auto mt-10 w-full max-w-[800px]">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div className="mx-auto flex justify-center" key={index}>
            <Image
              src={image}
              alt={`slide-${index}`}
              width={883}
              height={1417}
              className="mx-auto max-h-[70vh] w-fit"
              sizes="100vw"
            />
          </div>
        ))}
      </Slider>
      <div className="mt-6 flex w-full justify-center">
        {images.map((_, index) => (
          <div
            key={index}
            className={[
              'mx-[5px] my-2 h-2 rounded-full transition-all duration-300 ease-out',
              index === currentSlide ? 'bg-main w-8' : 'bg-teduri w-2',
            ].join(' ')}
          />
        ))}
      </div>
    </div>
  );
}
