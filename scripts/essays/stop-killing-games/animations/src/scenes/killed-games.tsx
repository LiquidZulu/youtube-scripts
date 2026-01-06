import { makeScene2D, Rect, Ray, Img, Video } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  waitUntil,
  useScene,
} from "@motion-canvas/core";
import {
  McasTxt as Txt,
  popin,
  popout,
  fadein,
  fadeout,
  Browser,
  sceneVar,
  after,
  flash,
} from "mcas";
import * as colors from "mcas/colors";
import vid from "../audio.mp4";
import crewWebsite from "../assets/crew-website.png";
import tahiti from "../assets/tahiti.webm";

export default makeScene2D(function* (view) {
  view.fill(colors.slate950);
  const skgblue = sceneVar("skgblue");

  const v = createRef<Video>();

  view.add(<Video src={vid} play ref={v} />);

  yield* waitUntil("browser");

  const browser = createRef<Browser>();
  const content = createRef<Rect>();

  view.add(
    <Browser
      ref={browser}
      hyperlink="https://www.ubisoft.com/en-us/game/the-crew/the-crew/news-updates/mOR3tviszkxfeQCUKxhOV"
    >
      <Rect ref={content}>
        <Img src={crewWebsite} width={1000} position={[0, 260]} />
      </Rect>
    </Browser>,
  );

  browser().mkHighlight(
    { lineWidth: 20, stroke: skgblue },
    [[234, 890], 40],
    [[-294, 912], 558],
    //
  );

  yield* all(
    popin(browser),
    v().filters.blur(20, 1),
    browser().scroll(1, 1),
    after("highlight", browser().highlight(1, 1)),
  );

  const f = createRef<Rect>();

  view.add(<Rect ref={f} height={20} width={138} position={[193, 242]} />);

  yield* after("licensing constraints", flash(f, skgblue));

  yield* after("browser small", popout(browser), v().filters.blur(0, 1));

  browser().removeHighlights();
  browser().scroll(0);
  browser().highlight(0);
  content().removeChildren();
  content().add(<Video position={[0, 70]} width={1000} src={tahiti} play />);

  yield* waitUntil("tahiti");

  yield* all(popin(browser), v().filters.blur(20, 1));

  yield* after("browser small heroes", popout(browser), v().filters.blur(0, 1));

  yield* waitFor(14);
});
