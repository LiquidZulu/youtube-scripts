import { makeScene2D, Rect, Ray, Img } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  delay,
  waitUntil,
} from "@motion-canvas/core";
import { McasTxt as Txt, popin, popout, fadein, fadeout } from "mcas";
import * as colors from "mcas/colors";
import communistImg from "../assets/the-communist.png";
import meImg from "../assets/the-objectivist.png";
import nominalistImg from "../assets/the-nominalist.png";

// Now here at least, the communist is asserting that their definition is correct and mine is incorrect, so there is a possibility of debating who is right and how the words should be used. The nominalist on the other hand completely rejects that its possible for a definition to be anything other than a linguistic contract of sorts.

export default makeScene2D(function* (view) {
  view.fill(colors.bg);

  const imgs = createRefArray<Img>();
  const quotes = createRefArray<Txt>();
  const nominalist = createRef<Rect>();

  view.add(
    <Rect layout width={1920} justifyContent="space-evenly">
      <Rect direction="column" gap={64}>
        <Img
          opacity={0}
          ref={imgs}
          src={communistImg}
          width={400}
          shadowBlur={50}
          shadowOffsetY={25}
          shadowColor="000000aa"
        />
        <Txt
          opacity={0}
          ref={quotes}
          fill="white"
          maxWidth={400}
          textWrap
          fontSize={60}
          textAlign="center"
          fontFamily="oswald"
        >
          My definition is correct!
        </Txt>
      </Rect>
      <Rect direction="column" gap={64}>
        <Img
          opacity={0}
          ref={imgs}
          src={meImg}
          width={400}
          shadowBlur={50}
          shadowOffsetY={25}
          shadowColor="000000aa"
        />
        <Txt
          opacity={0}
          ref={quotes}
          fill="white"
          maxWidth={400}
          textWrap
          fontSize={60}
          textAlign="center"
          fontFamily="oswald"
        >
          My definition is correct!
        </Txt>
      </Rect>
      <Rect ref={nominalist} direction="column" gap={64} marginLeft={-774}>
        <Img
          ref={imgs}
          opacity={0}
          src={nominalistImg}
          width={400}
          shadowBlur={50}
          shadowOffsetY={25}
          shadowColor="000000aa"
        />
        <Txt
          ref={quotes}
          opacity={0}
          fill="white"
          maxWidth={400}
          textWrap
          fontSize={60}
          textAlign="center"
          fontFamily="oswald"
        >
          It is not possible for a definition to be correct...
        </Txt>
      </Rect>
    </Rect>,
  );

  yield* all(
    ...imgs.slice(0, 2).map((img, i) =>
      delay(
        0.1 * i,
        fadein(() => img),
      ),
    ),
    delay(
      0.1,
      all(
        ...quotes.slice(0, 2).map((quote, i) =>
          delay(
            0.1 * i,
            fadein(() => quote),
          ),
        ),
      ),
    ),
  );

  yield* waitUntil("nominalist");

  yield* all(
    nominalist().margin(0, 1),
    delay(
      0.6,
      all(
        fadein(() => imgs[2]),
        delay(
          0.1,
          fadein(() => quotes[2]),
        ),
      ),
    ),
  );

  yield* waitUntil("end");

  yield* all(
    ...imgs.map((img, i) =>
      delay(
        0.1 * i,
        fadeout(() => img),
      ),
    ),
    delay(
      0.1,
      all(
        ...quotes.map((quote, i) =>
          delay(
            0.1 * i,
            fadeout(() => quote),
          ),
        ),
      ),
    ),
  );

  yield* waitUntil("blank");
});
