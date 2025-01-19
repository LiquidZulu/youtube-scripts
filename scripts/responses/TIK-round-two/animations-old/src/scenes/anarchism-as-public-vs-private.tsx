import { makeScene2D, Rect, Ray, Img } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  linear,
  waitUntil,
  delay,
} from "@motion-canvas/core";
import { McasTxt as Txt, popin, popout, fadein, fadeout } from "mcas";
import * as colors from "mcas/colors";
import { ArrowList } from "mcas/lib";

// So, on this view anarchism is an ideology that is opposed to the state, where the state is any "public" hierarchy. TIK says here that the standard for what is "public" as against "private" is size. He elaborates on this in another video:

export default makeScene2D(function* (view) {
  view.fill(colors.bg);

  const parts = createRefArray<Txt>();
  const texts = [
    "Anarchism",
    " is an ideology that is opposed to ",
    "the state",
    ".",
  ];
  const fullTextLength = texts.reduce((a, b) => a + b.length, 0);

  const title = createRef<Txt>();

  view.add(
    <Txt ref={title} fontFamily="Oswald" fill="white" fontSize={60}>
      <Txt ref={parts} glow fill={colors.yellow500}></Txt>
      <Txt ref={parts}></Txt>
      <Txt ref={parts} fill={colors.red500} glow></Txt>
      <Txt ref={parts}></Txt>
    </Txt>,
  );

  yield* chain(
    ...parts.map((part, i) =>
      part.text(texts[i], texts[i].length / fullTextLength / 2, linear),
    ),
  );

  yield* waitUntil("state as public hierarchy");

  const list = createRef<ArrowList>();

  view.add(
    <ArrowList ref={list} position={[0, 100]}>
      <Txt>
        The state is any "
        <Txt glow fill={colors.red500}>
          public
        </Txt>
        " hierarchy.
      </Txt>
      <Txt>
        The standard of "
        <Txt glow fill={colors.red500}>
          public
        </Txt>
        " vs "
        <Txt glow fill={colors.yellow500}>
          private
        </Txt>
        " is <Txt.i>size</Txt.i>.
      </Txt>
    </ArrowList>,
  );

  yield* all(title().position([0, -100], 1), delay(0.2, list().next()));

  yield* waitUntil("public vs private standard");

  yield* list().next();

  yield* waitUntil("gone");

  yield* all(
    fadeout(title),
    delay(
      0.1,
      all(...list().items.map((item, i) => delay(0.1 * i, list().hide(item)))),
    ),
  );

  yield* waitUntil("blank");
});
