import { makeScene2D, Rect, Ray, Img } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  delay,
  easeOutSine,
  waitUntil,
} from "@motion-canvas/core";
import { McasTxt as Txt, popin, popout, fadein, fadeout } from "mcas";
import * as colors from "mcas/colors";
import { after, Browser } from "mcas/lib";
import page from "../assets/anti-industrial-revolution.png";

export default makeScene2D(function* (view) {
  view.fill(colors.bggreen);

  const browser = createRef<Browser>();

  view.add(
    <Browser
      ref={browser}
      scale={0.9}
      hyperlink="https://courses.aynrand.org/works/the-anti-industrial-revolution/"
    >
      <Img width={1000} position={[0, 4160]} src={page} />
    </Browser>,
  );

  browser().mkHighlight(
    { lineWidth: 22, opacity: 0.3, stroke: colors.purple500 },
    [[348, 7112], 120],
    [[-330, 7112 + 28], 808],
    [[-330, 7112 + 28 * 2], 808],
    [[-330, 7112 + 28 * 3], 770],
    [[-330, 7112 + 28 * 4], 628],
  );

  yield* all(
    browser().scale(1, 1, easeOutSine),
    delay(0.2, browser().scroll(0.43, 1)),
    after("highlight", browser().highlight(1, 1)),
  );

  yield* waitUntil("end");
});
