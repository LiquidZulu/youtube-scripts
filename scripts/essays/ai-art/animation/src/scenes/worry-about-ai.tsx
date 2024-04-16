import { makeScene2D, Img, Txt, Rect, Ray } from "@motion-canvas/2d";
import { waitFor, chain, createRef, Reference } from "@motion-canvas/core";
import deanVanDeWalle from "../assets/dean-van-de-walle.png";
import FENNAH from "../assets/fennah.png";
import duchessCelestia from "../assets/duchess-celestia.png";

export default makeScene2D(function* (view) {
  const imageSize = 200;
  const gap = 64;

  const quotes: Array<[string, string, Reference<Rect>]> = [
    [deanVanDeWalle, `It has a "low bar to entry."`, createRef<Rect>()],
    [
      FENNAH,
      `The difficulty of an art career is what "separates\nthe [...] wheat from the chaff."`,
      createRef<Rect>(),
    ],
    [
      duchessCelestia,
      `Those who cannot make art without AI "shouldn't be\nable to make [it]."`,
      createRef<Rect>(),
    ],
  ];

  view.fill(0x202228);
  view.add(
    <Rect layout direction="column" gap={gap}>
      <Txt fontSize={64} fontFamily="cubano" fill={0xffffff} textAlign="center">
        Why worry about AI art?
      </Txt>
      {quotes.map(([src, txt, ref]) => (
        <Rect
          opacity={0}
          ref={ref}
          layout
          direction="row"
          gap={gap}
          alignItems="center"
        >
          <Img
            shadowBlur={30}
            shadowColor={0}
            shadowOffset={[0, 16]}
            src={src}
            width={imageSize}
          />
          <Txt fontFamily="cubano" fill={0xffffff} text={txt} />
        </Rect>
      ))}
    </Rect>
  );

  yield* waitFor(2);

  for (let quote of quotes) {
    yield* chain(quote[2]().opacity(1, 1), waitFor(3));
  }
});
