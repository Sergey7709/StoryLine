import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Carousel } from "@mantine/carousel";
import { Image } from "@mantine/core";
import { Link } from "react-router-dom";

export const Carusel = ({
  imageUrl,
  maxWidth,
  height,
}: {
  imageUrl: {
    id: number | string;
    url: string;
  }[];
  maxWidth: number | string;
  height?: number | string;
}) => {
  const autoplay = useRef(Autoplay({ delay: 3000 }));

  const slides = imageUrl.map((item) => {
    const image = (
      <Image
        onClick={(e) => {
          e.stopPropagation();
        }}
        src={item.url}
      />
    );

    return (
      <Carousel.Slide key={item.id}>
        {typeof item.id === "number" ? (
          <Link to={`/book-card/${item.id}`}>{image}</Link>
        ) : (
          image
        )}
      </Carousel.Slide>
    );
  });

  return (
    <Carousel
      maw={maxWidth}
      withIndicators
      height={height}
      align="start"
      loop
      plugins={[autoplay.current]}
      onMouseEnter={autoplay.current.stop}
      onMouseLeave={autoplay.current.reset}
    >
      {slides}
    </Carousel>
  );
};
