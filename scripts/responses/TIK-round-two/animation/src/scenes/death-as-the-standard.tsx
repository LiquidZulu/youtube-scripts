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
  view.fill("#030014");

  const title = createRef<Txt>();
  const list = createRef<ArrowList>();

  view.add(
    <Rect layout direction="column" gap={64} alignItems="center">
      <Txt
        fontSize={60}
        glow
        fontFamily="Oswald"
        fill={colors.purple500}
        ref={title}
      />
      <ArrowList ref={list}>
        <Txt textWrap maxWidth={1600}>
          When one abstracts away all of the particular details inherent in
          life, they come to the concept of death.
        </Txt>
        <Txt textWrap maxWidth={1600}>
          A null, a nothing, a zero, is being used as the guide for the
          something, the thing, the life.
        </Txt>
        <Txt textWrap maxWidth={1600}>
          This is the fallacy of reification---a nothing is being treated as a
          something.
        </Txt>
        <Txt textWrap maxWidth={1600}>
          Death is not something that one can achieve---at the moment of death,
          there is no "one" to speak of.
        </Txt>
        <Txt textWrap maxWidth={1600}>
          Philosophy cannot guide man when certain death faces him.
        </Txt>
      </ArrowList>
    </Rect>,
  );

  yield* all(title().text("DEATH AS THE STANDARD:", 1), list().next());

  yield* list().next("null");
  yield* list().next("reification");
  yield* list().next("death cant be achieved");
  yield* list().next("philosophy cant be a guide");
  yield* list().hideAll("out", fadeout(title));

  // When one abstracts away all the particular details inherent in life, they come to the concept of death. So a null--a nothing--a zero--is being used as a guide for the something--the thing--the life. This is the fallacy of reification--literally "thing-making"--a nothing is being treated as a something. Death is not something that one can achieve---at the moment of death, there is no "one" to speak of. Death is the end, the boundary, the non-existent as far as ethics and philosophy itself is concerned. No man can possibly have philosophy be his guide when certain death faces him. To ask what ethics has to say on a scenario where a man is moments away from death is just as valid to ask of the epistemologist how man can possibly gain any knowledge as he is enveloped by the explosion from a nuclear bomb. That man cannot gain knowledge here, does nothing to refute epistemology or ethics.
});
