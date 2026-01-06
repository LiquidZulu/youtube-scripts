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
  after,
  flash,
} from "mcas";
import * as colors from "mcas/colors";

export default makeScene2D(function* (view) {
  view.fill(0);

  const list = createRef<ArrowList>();
  const cont = createRef<Rect>();

  view.add(
    <Rect ref={cont} layout direction="column" gap={128} alignItems="center">
      <Txt uppercase glow fill="red" fontSize={200} fontFamily="oswald">
        adventurism vs opportunism
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
          Adventurists: demand rash and immediate direct action, and a complete
          refusal of established political channels.
        </Txt>
        <Txt fontFamily="ProggyClean CE Nerd Font" fill="#E4E0DA" writeOn={0}>
          Opportunists: tendency towards half-way measures and compromise,
          without a strong commitment to long-term goals.
        </Txt>
      </ArrowList>
    </Rect>,
  );

  yield* waitUntil("adventurism");
  yield* list().next();
  yield* waitUntil("opportunism");
  yield* list().next();

  yield* after(
    "indicate adventurists",
    flash(() => (list as any)().children()[0].children()[0], "red"),
  );

  yield* waitUntil("end");
});
