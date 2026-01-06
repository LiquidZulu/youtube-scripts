import { makeScene2D, Rect, Ray, Img, Video } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  waitUntil,
} from "@motion-canvas/core";
import {
  McasTxt as Txt,
  popin,
  popout,
  fadein,
  fadeout,
  sceneVar,
  Browser,
  after,
} from "mcas";
import * as colors from "mcas/colors";
import vid from "../assets/dmca.mp4";
import website from "../assets/dmca-website.png";

export default makeScene2D(function* (view) {
  view.fill(colors.slate950);
  const skgblue = sceneVar("skgblue");

  const v = createRef<Video>();
  view.add(<Video src={vid} play ref={v} />);

  const browser = createRef<Browser>();

  view.add(
    <Browser
      scale={0}
      hyperlink="https://www.stopkillinggames.com/"
      ref={browser}
    >
      <Img src={website} width={1000} position={[0, 1200]} />
    </Browser>,
  );

  browser().mkHighlight(
    { lineWidth: 20, stroke: skgblue },
    [[27, 824], 220],
    [[-270, 850], 392],
  );

  yield* after("browser", popin(browser), v().opacity(0, 1));
  yield* after("scroll", browser().scroll(0.12, 1));
  yield* after("highlight", browser().highlight(1, 1));
  yield* waitUntil("end");
});
