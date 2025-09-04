'use client';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useState } from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import { imgUrlItem } from '@/types/profile';

interface ImageSliderProps {
  images: imgUrlItem[];
  autoplay?: boolean;
}

const ImageSlider = ({ images, autoplay }: ImageSliderProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: autoplay,
    autoplaySpeed: 3000,
    afterChange: (current: number) => setCurrentSlide(current),
  };

  return (
    <div className="mx-auto w-full max-w-[800px]">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <div className="relative h-[200px] w-full">
              <Image
                src={image.url}
                alt={`slide-${index}`}
                layout="fill"
                objectFit="contain"
                priority
              />
            </div>
          </div>
        ))}
      </Slider>
      <div className="flex w-full justify-center">
        {images.map((_, index) => (
          <div
            key={index}
            className={[
              'mx-[5px] my-2 h-2 rounded-full transition-all duration-300 ease-out',
              index === currentSlide ? 'bg-gray w-8' : 'bg-teduri w-2',
            ].join(' ')}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
