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
import { Browser } from "mcas/lib";
import img from "../assets/aristotle-not-consistent.png";

export default makeScene2D(function* (view) {
  view.fill(colors.bg);

  // Peikoff tells us in his history of philosophy that Aristotle the man had both Platonist and Aristotelian elements in him.[fn:50] This simply could not be the case if Aristotelian meant whatever beliefs in philosophy Aristotle held, much like the closed Objectivists want to have for Rand.

  const browser = createRef<Browser>();
  view.add(
    <Browser
      ref={browser}
      hyperlink="https://www.youtube.com/watch?v=Qvl4f8l7Ctk"
    >
      <Img width={1000} src={img} position={[0, 5]} />
    </Browser>,
  );

  yield* popin(browser);
  yield* waitUntil("end");
});
