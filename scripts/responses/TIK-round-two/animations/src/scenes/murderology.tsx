import { makeScene2D, Rect, Ray, Img } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
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
  view.fill(colors.bg);

  const title = createRef<Txt>();
  const list = createRef<ArrowList>();

  view.add(
    <Rect layout direction="column" alignItems="center" gap={64}>
      <Txt fontSize={60} fill={colors.zinc50} ref={title}>
        Murderology:
      </Txt>
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

  yield* all(fadein(title), list().next());
  yield* waitFor(3);
  yield* list().next();
  yield* waitFor(3);
  yield* all(
    fadeout(title),
    ...list().items.map((item, i) =>
      chain(waitFor((i + 1) * 0.2), list().hide(item)),
    ),
  );
});
