import { makeScene2D, Rect, Ray, Img } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  useDuration,
} from "@motion-canvas/core";
import { McasTxt as Txt, popin, popout, fadein, fadeout } from "mcas";
import * as colors from "mcas/colors";
import { images } from "../assets/dave-smith-exacerbating-borders";

export default makeScene2D(function* (view) {
  view.fill(0);

  const duration = useDuration("duration");

  const img = createRef<Img>();

  view.add(<Img size={view.size} ref={img} />);

  for (let i = 0; i < images.length; ++i) {
    img().src(images[i]);
    yield* waitFor(duration / images.length);
  }
});
