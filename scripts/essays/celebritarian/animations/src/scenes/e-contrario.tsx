import { makeScene2D, Rect, Ray, Img } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  waitUntil,
  Color,
  tween,
  easeInOutCubic,
  sequence,
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
  const contradictions = createRefArray<Txt>();

  view.add(
    <Rect layout direction="column" gap={128}>
      <Txt uppercase glow fill="red" fontFamily="oswald" fontSize={200}>
        rothbard's argumentum e contrario
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
        width={2800}
        hGap={128}
      >
        <Txt fill="#E4E0DA" writeOn={0} fontFamily="ProggyClean CE Nerd Font">
          Only three possible ethics with respect to ownership.
        </Txt>
        <Txt fill="#E4E0DA" writeOn={0} fontFamily="ProggyClean CE Nerd Font">
          Everyone owns themselves;
        </Txt>
        <Txt
          ref={contradictions}
          fill="#E4E0DA"
          writeOn={0}
          fontFamily="ProggyClean CE Nerd Font"
        >
          one group owns another, or;
        </Txt>
        <Txt
          ref={contradictions}
          fill="#E4E0DA"
          writeOn={0}
          fontFamily="ProggyClean CE Nerd Font"
        >
          everyone owns everyone else.
        </Txt>
      </ArrowList>
    </Rect>,
  );

  view.add(
    <Txt
      glow
      fontSize={70}
      position={[0, 1000]}
      fontFamily="ProggyClean CE Nerd Font"
    >
      See: Murray N. Rothbard, "Interpersonal Relations: Ownership and
      Aggression," in id., <Txt.i>The Ethics of Liberty</Txt.i>
    </Txt>,
  );

  yield* list().next("e contrario");
  yield* list().next("self-ownership");
  yield* list().next("class ethic");
  yield* list().next("communist ethic");
  yield* after(
    "contradiction",
    ...contradictions.map((txt) =>
      sequence(
        0.01,
        ...txt
          .children()
          .map((child) =>
            all(
              child.fill("red", 0.2),
              child.shadowColor("red").shadowBlur(70, 0.2),
            ),
          ),
      ),
    ),
  );

  yield* after(
    "only self ownership",
    flash(() => list().items[1], "red"),
  );

  yield* waitUntil("end");
});
