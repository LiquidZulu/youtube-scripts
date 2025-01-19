import { makeScene2D, Rect, Ray, Img } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  waitUntil,
  sequence,
} from "@motion-canvas/core";
import { McasTxt as Txt, popin, popout, fadein, fadeout } from "mcas";
import * as colors from "mcas/colors";
import { ArrowList } from "mcas/lib";

// murderology: "how should men act,
// including what are the proper methods
// of murder? Murder is a value to men
// only if it is the right kind of murder,
// after all!"

export default makeScene2D(function* (view) {
  view.fill("#030014");

  const title = createRef<Txt>();
  const list = createRef<ArrowList>();

  view.add(
    <Rect layout direction="column" alignItems="center" gap={64}>
      <Txt
        glow
        fontFamily="oswald"
        fill={colors.purple500}
        fontSize={90}
        ref={title}
      />
      <ArrowList ref={list}>
        <Txt>
          How should men act, including what{"\n"}
          are the proper methods of murder?
        </Txt>
        <Txt>
          Murder is a value to men only if it{"\n"}is the right kind of murder,
          after all!
        </Txt>
      </ArrowList>
    </Rect>,
  );

  yield* title().text("murderology:".toUpperCase(), 1);
  yield* list().next("question asked");
  yield* list().next("murder value");
  yield* waitUntil("out");
  yield* sequence(0.1, fadeout(title), list().hideAll());
});
