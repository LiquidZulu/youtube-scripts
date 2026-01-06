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

  const list = createRef<ArrowList>();

  view.add(
    <Rect layout direction="column" gap={128}>
      <Txt uppercase glow fill="red" fontFamily="oswald" fontSize={200}>
        peikoff's philosophical theory of history
      </Txt>
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
          The type of society which obtains at any given point is due to the
          choices of the men who make it up.
        </Txt>
        <Txt fill="#E4E0DA" writeOn={0}>
          The choices made are based on the premises that those men hold.
        </Txt>
        <Txt fill="#E4E0DA" writeOn={0}>
          We want the most fundamental premises there are---
          <Txt.i>philosophical</Txt.i> premises.
        </Txt>
      </ArrowList>
    </Rect>,
  );

  yield* list().next();
  yield* list().next("choices come from premises");
  yield* list().next("philosophical premises");
  yield* waitUntil("end");
});
