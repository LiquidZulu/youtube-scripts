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

export default makeScene2D(function* (view) {
  view.fill(colors.bg);

  const title = createRef<Txt>();
  const arrow = createRef<ArrowList>();
  const subs = createRefArray<Txt>();

  view.add(
    <Txt fontSize={100} ref={title} fill={colors.zinc50}>
      Epilology
    </Txt>,
  );

  // {"x":1209.4666748046875,"y":57}

  view.add(
    <ArrowList ref={arrow} position={[0, 100]}>
      <Txt>
        Thymology
        <Txt ref={subs} opacity={0} marginRight={-1138.5166015625}>
          : the study of particular instances of man-made facts.
        </Txt>
      </Txt>
      <Txt>
        Praxeology
        <Txt ref={subs} opacity={0} marginRight={-1209.4666748046875}>
          : the study of general facts about the man-made as such.
        </Txt>
      </Txt>
    </ArrowList>,
  );

  yield* fadein(title);
  yield* waitFor(1);

  yield* all(
    title().position([0, -120], 1),
    chain(waitFor(0.3), arrow().next()),
  );
  yield* arrow().next();

  yield* all(
    subs[0].margin([0, 0, 0, 0], 2),
    subs[1].margin([0, 0, 0, 0], 2),
    chain(waitFor(0.8), subs[0].opacity(1, 1)),
  );

  yield* waitFor(2);
  yield* subs[1].opacity(1, 1);
  yield* waitFor(3);

  yield* all(
    arrow().hide(arrow().items[1]),
    chain(waitFor(0.2), arrow().hide(arrow().items[0])),
    chain(waitFor(0.6), fadeout(title)),
  );
});
