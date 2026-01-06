import { makeScene2D, Rect, Ray, Img, Video } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  useScene,
  spawn,
  delay,
  Vector2,
} from "@motion-canvas/core";
import {
  McasTxt as Txt,
  popin,
  popout,
  fadein,
  fadeout,
  Browser,
  after,
  SquigglyBorder,
} from "mcas";
import * as colors from "mcas/colors";
import skgWebsite from "../assets/skg-website.png";
import intro from "../assets/intro.mp4";

export default makeScene2D(function* (view) {
  view.fill(colors.slate950);

  const skgblue = useScene().variables.get("skgblue", 0);

  const squiggly = createRef<SquigglyBorder>();
  const vid = createRef<Video>();
  const cont = createRef<Rect>();
  let wiggle = true;

  view.add(
    <Rect ref={cont} shadowColor={skgblue} shadowBlur={200}>
      <SquigglyBorder stroke={"ffffff00"} ref={squiggly}>
        <Video ref={vid} src={intro} play />
      </SquigglyBorder>
    </Rect>,
  );

  yield spawn(function* () {
    while (wiggle) {
      yield* squiggly().wiggle();
    }
  });

  yield* after(
    "vid shrink",
    //vid().width(1920 * (2 / 3), 1),
    cont().scale(2 / 3, 1),
    squiggly().stroke("ffffff", 1),
  );

  const browser = createRef<Browser>();
  view.add(
    <Browser
      position={[0, 1080]}
      shadowColor={skgblue}
      hyperlink="https://www.stopkillinggames.com/"
      ref={browser}
    >
      <Img src={skgWebsite} width={1000} position={[0, 420]} />
    </Browser>,
  );

  yield* after(
    "browser",
    cont().position([0, -1080], 1),
    cont().shadowBlur(0, 1),
    browser().position(0, 1),
    browser().shadowBlur(200, 1),
    after("scroll", browser().scroll(0.6, 1)),
  );

  wiggle = false;

  browser().mkHighlight(
    { lineWidth: 20, stroke: skgblue },
    [[280, 762], 60],
    [[-340, 782], 190],
    //
  );

  browser().mkHighlight(
    { lineWidth: 20, stroke: skgblue },
    [[208, 903], 100],
    [[-314, 925], 278],
    //
  );

  yield* after("highlight", browser().highlight(2, 1));

  yield* waitFor(10);
});
