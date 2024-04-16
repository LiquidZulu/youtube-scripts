import { makeScene2D, Txt, Layout, Img } from "@motion-canvas/2d";
import { waitFor, chain, createRef } from "@motion-canvas/core";
import * as randomImages from "../assets/random-objects";

const selectImage = (
  images: { [key: string]: string },
  currentImage?: string
): string => {
  const keys = Object.keys(images);
  const randomImage = images[keys[(keys.length * Math.random()) << 0]];

  if (randomImage == currentImage) return selectImage(images, currentImage);

  return randomImage;
};

export default makeScene2D(function* (view) {
  const imageRef = createRef<Img>();
  view.fill(0x202228);
  view.add(
    <Layout>
      <Txt
        x={-561.5 / 2 - 60}
        fill={0xffffff}
        fontSize={200}
        fontFamily="Mononoki"
        text="Art = "
      />
      <Img x={512 / 2 + 60} width={512} ref={imageRef} />
    </Layout>
  );

  let currentImage = selectImage(randomImages);
  for (let i = 0; i < 5 * 30; ++i) {
    currentImage = selectImage(randomImages, currentImage);
    yield* chain(imageRef().src(currentImage, 0), waitFor(1 / 30));
  }
});
