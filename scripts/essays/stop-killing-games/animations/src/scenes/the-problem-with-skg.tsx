import { makeScene2D, Rect, Ray, Img } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  useScene,
} from "@motion-canvas/core";
import {
  McasTxt as Txt,
  popin,
  popout,
  fadein,
  fadeout,
  sceneVar,
  Browser,
  ArrowList,
} from "mcas";
import * as colors from "mcas/colors";
import skgWebsite from "../assets/skg-website.png";

export default makeScene2D(function* (view) {
  view.fill(colors.slate950);
  const skgblue = sceneVar("skgblue");

  // My view is that this proposed solution does not get at the heart of the issue and is destined to have unintended consequences. It fails both as a permanent solution and as a half-measure or "baby step" towards the ideal. This is because the real problem that Stop Killing Games identifies is caused by the fact that in the first place the government grants monopoly protections to these game publishers in the form of copyrights and patents.

  const list = createRef<ArrowList>();
  const title = createRef<Txt>();
  const browser = createRef<Browser>();

  view.add(
    <Rect layout direction="column" alignItems="center" gap={96}>
      <Txt ref={title} glow fontFamily="oswald" fill={skgblue} fontSize={60} />
      <Rect gap={128} alignItems="center">
        <Browser
          ref={browser}
          height={700}
          width={800}
          position={[0, 1080]}
          shadowBlur={100}
          shadowColor={skgblue}
          hyperlink="https://www.stopkillinggames.com/"
        >
          <Img src={skgWebsite} width={800} position={[0, 330]} />
        </Browser>
        <ArrowList hgap={54} width={800} ref={list}>
          <Txt fontSize={40}>
            The proposal does not get at the heart of the issue and is destined
            to have unintended consequences.
          </Txt>
          <Txt fontSize={40}>
            It fails both as a permanent solution and as a half-measure.
          </Txt>
          <Txt fontSize={40}>
            The real problem that SKG identifies is caused by
            government-enforced monopoly protections in the form of copyrights
            and patents.
          </Txt>
        </ArrowList>
      </Rect>
    </Rect>,
  );

  yield* all(
    title().text("THE PROBLEM WITH STOP KILLING GAMES", 1),
    popin(browser),
    list().next("not get at heart"),
  );
  yield* list().next("fails permanent");
  yield* list().next("IP is the problem");

  yield* waitFor(20);
});
