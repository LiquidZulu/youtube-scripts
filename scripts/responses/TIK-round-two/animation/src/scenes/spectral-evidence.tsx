import { makeScene2D, Rect, Ray, Img } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  waitUntil,
} from "@motion-canvas/core";
import { McasTxt as Txt, popin, popout, fadein, fadeout } from "mcas";
import * as colors from "mcas/colors";
import { Browser, flashAround } from "mcas/lib";
import webpage from "../assets/spectral-evidence-webpage.png";
import otherpage from "../assets/spectral-evidence-webpage-other.png";

export default makeScene2D(function* (view) {
  const browser = createRef<Browser>();
  const page = createRef<Img>();

  view.add(
    <Browser
      ref={browser}
      hyperlink={"https://definitions.uslegal.com/s/spectral-evidence/"}
    >
      <Img ref={page} src={webpage} width={1000} />
    </Browser>,
  );

  yield* popin(browser);

  const h1 = createRefArray<Ray>();
  {
    let i = 0;
    for (let x of [495, 460, 490, 482, 475, 395]) {
      browser().add(
        <Ray
          ref={h1}
          layout={false}
          lineWidth={18}
          stroke={colors.sky500}
          toX={x}
          opacity={0.2}
          position={[-460, 150 + 20 * i++]}
        />,
      );
    }
  }

  const h2 = createRefArray<Ray>();
  {
    let i = 0;
    for (let x of [510, 505, 178]) {
      browser().add(
        <Ray
          ref={h2}
          layout={false}
          lineWidth={18}
          stroke={colors.sky500}
          toX={x}
          opacity={0.2}
          position={[-460, 281 + 20 * i++]}
        />,
      );
    }
  }

  const highlight = [createSignal(0), createSignal(0)];

  for (let i = 0; i < h1.length; ++i) {
    h1[i].end(createSignal(() => highlight[0]() * h1.length - i));
  }
  for (let i = 0; i < h2.length; ++i) {
    h2[i].end(createSignal(() => highlight[1]() * h2.length - i));
  }

  yield* waitUntil("h1");
  yield* highlight[0](1, 1);
  yield* waitUntil("h2");
  yield* highlight[1](1, 1);
  yield* waitUntil("highlight out");
  yield* all(highlight[1](0, 1), highlight[0](0, 1));
  yield* waitUntil("other page");
  yield* all(
    chain(
      page().opacity(0, 0.3),
      page().src(otherpage, 0.001),
      page().opacity(1, 0.3),
    ),
    browser().hyperlink(
      "https://www.nesl.edu/blog/detail/a-true-legal-horror-story-the-laws-leading-to-the-salem-witch-trials",
      1,
    ),
    browser().scroll(0.46, 1),
  );

  const indicate = createRef<Rect>();

  view.add(
    <Rect ref={indicate} width={630} height={380} position={[120, 35]} />,
  );

  yield* flashAround(indicate);

  yield* waitUntil("end");
  yield* popout(browser);
});
