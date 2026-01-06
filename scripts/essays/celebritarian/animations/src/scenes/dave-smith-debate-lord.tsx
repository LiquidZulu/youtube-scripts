import { makeScene2D, Rect, Ray, Img } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
} from "@motion-canvas/core";
import { McasTxt as Txt, popin, popout, fadein, fadeout } from "mcas";
import * as colors from "mcas/colors";
import { final, images } from "../assets/dave-smith-debate-lord";

export default makeScene2D(function* (view) {
  view.fill(0);

  const duration = 6 + 9 / 30;
  const finalDuration = 2;
  const perImage = (duration - finalDuration) / images.length;

  const img = createRef<Img>();

  view.add(<Img size={view.size} ref={img} />);

  for (let i = 0; i < images.length; ++i) {
    img().src(images[i]);
    yield* waitFor(perImage);
  }

  img().src(final);
  yield* waitFor(finalDuration);
});
