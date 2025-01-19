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
  view.fill(colors.bg);

  const title = createRef<Txt>();
  const arrow = createRef<ArrowList>();
  const subs = createRefArray<Txt>();

  view.add(
    <Txt fontSize={100} ref={title} fill={colors.zinc50}>
      Epilology
    </Txt>,
  );

  const texts = [
    ": the study of general facts about the man-made as such.",
    ": the study of particular instances of man-made facts.",
  ];

  view.add(
    <ArrowList>
      <Txt />
    </ArrowList>,
  );

  view.add(
    <ArrowList ref={arrow} position={[0, 100]}>
      <Txt>
        Praxeology
        <Txt ref={subs} />
      </Txt>
      <Txt>
        Thymology
        <Txt ref={subs} />
      </Txt>
    </ArrowList>,
  );

  yield* fadein(title);
  yield* waitUntil("praxeology");

  yield* all(
    title().position([0, -120], 1),
    chain(waitFor(0.3), arrow().next()),
    chain(waitUntil("thymology"), arrow().next()),
  );

  yield* waitUntil("thymologysub");

  yield* subs[1].text(texts[1], 2);

  yield* waitUntil("praxeologsub");
  yield* subs[0].text(texts[0], 2);

  yield* waitUntil("end");

  yield* all(
    arrow().hide(arrow().items[1]),
    chain(waitFor(0.2), arrow().hide(arrow().items[0])),
    chain(waitFor(0.6), fadeout(title)),
  );
});
