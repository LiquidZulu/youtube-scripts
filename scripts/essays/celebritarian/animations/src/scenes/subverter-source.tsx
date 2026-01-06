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
  const cont = createRef<Rect>();

  view.add(
    <Rect ref={cont} layout direction="column" gap={128} alignItems="center">
      <Txt uppercase glow fill="red" fontSize={200} fontFamily="oswald">
        source of the subversions
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
        <Txt fontFamily="ProggyClean CE Nerd Font" fill="#E4E0DA" writeOn={0}>
          The subversions have two sources:
        </Txt>
        <Txt fontFamily="ProggyClean CE Nerd Font" fill="#E4E0DA" writeOn={0}>
          (1) through fiatatarians bringing along their old bad premises, but
          translating them into libertarian terminology;
        </Txt>
        <Txt fontFamily="ProggyClean CE Nerd Font" fill="#E4E0DA" writeOn={0}>
          (2) through active subverters in the movement.
        </Txt>
      </ArrowList>
    </Rect>,
  );

  yield* list().next("two sources");
  yield* list().next("first");
  yield* list().next("second");
  yield* waitUntil("end");
});
