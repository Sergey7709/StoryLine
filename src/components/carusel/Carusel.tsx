import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Carousel } from "@mantine/carousel";
import { Image } from "@mantine/core";

const IMAGES_CARUSEL: string[] = [
  "https://th.bing.com/th/id/OIG.Cg5BCUCNTG8mFaNnTV6E?pid=ImgGn",
  "https://th.bing.com/th/id/OIG.9jqYqengVvwcbnNpADea?pid=ImgGn",
  "https://th.bing.com/th/id/OIG.OQY65Dcc2I8nM9F.q7Tz?pid=ImgGn",
  "https://th.bing.com/th/id/OIG.WTO5CXQjC8yjv8PRGp5i?pid=ImgGn",
  "https://th.bing.com/th/id/OIG.Pylbn1FZneukN416y69y?pid=ImgGn",
];

export const Carusel = () => {
  const autoplay = useRef(Autoplay({ delay: 3000 }));
  const slides = IMAGES_CARUSEL.map((url) => (
    <Carousel.Slide key={url}>
      <Image src={url} />
    </Carousel.Slide>
  ));

  return (
    <Carousel
      maw={700}
      mx="auto"
      withIndicators
      height={700}
      dragFree
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
