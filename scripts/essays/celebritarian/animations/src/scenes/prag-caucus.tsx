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
import {
  McasTxt as Txt,
  popin,
  popout,
  fadein,
  fadeout,
  ArrowList,
} from "mcas";
import * as colors from "mcas/colors";

export default makeScene2D(function* (view) {
  view.fill(0);

  const title = createRef<Txt>();
  const cont = createRef<Rect>();
  const list = createRef<ArrowList>();

  view.add(
    <Rect layout direction="column" alignItems="center" gap={170} ref={cont}>
      <Txt ref={title} glow fontFamily="oswald" fill="red" fontSize={200} />
      <ArrowList
        in={(text: Txt, ray: Ray) => {
          text.opacity(1);
          text.children()[0].fontFamily("ProggyClean CE Nerd Font");

          return all(ray.end(1, 1), text.children()[0].writeOn(1, 1));
        }}
        ref={list}
        fontSize={130}
        fontFamily="ProggyClean CE Nerd Font"
        shadowColor="#E4E0DA"
        shadowBlur={64}
        width={2800}
        hGap={128}
      >
        <Txt fill="#E4E0DA" writeOn={0}>
          Rejected hardline principle in favour of what "works."
        </Txt>
        <Txt fill="#E4E0DA" writeOn={0}>
          The standard of working that the LPC adopted was whatever generated
          the most acceptance by regime actors in Washington luncheons.
        </Txt>
        <Txt fill="#E4E0DA" writeOn={0}>
          This yielded a distinctly leftist, regime-oriented Libertarian Party.
        </Txt>
      </ArrowList>
    </Rect>,
  );

  yield* all(
    title().text("THE LIBERTARIAN PRAGMATIST CAUCUS", 1),
    list().next(),
  );

  yield* waitUntil("washington luncheons");
  cont().position([0, -24]);
  yield* list().next();

  yield* waitUntil("leftist LP");
  cont().position([0, -40]);
  yield* list().next();

  yield* waitUntil("end");
});
