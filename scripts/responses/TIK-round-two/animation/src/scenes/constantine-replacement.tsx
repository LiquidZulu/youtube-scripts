import { makeScene2D, Rect, Ray, Img } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  sequence,
  Reference,
  waitUntil,
} from "@motion-canvas/core";
import { McasTxt as Txt, popin, popout, fadein, fadeout } from "mcas";
import * as colors from "mcas/colors";
import { after, ArrowList, flash } from "mcas/lib";

export default makeScene2D(function* (view) {
  view.fill("#030014");

  const list = createRef<ArrowList>();
  const title = createRef<Txt>();

  view.add(
    <Rect layout direction="column" gap={64} alignItems="center">
      <Txt
        ref={title}
        fontFamily="oswald"
        glow
        fill={colors.purple500}
        fontSize={60}
      />
      <ArrowList ref={list}>
        <Txt textWrap maxWidth={1400}>
          Value is that which man acts to gain and/or keep---you cannot gain or
          keep death.
        </Txt>
        <Txt textWrap maxWidth={1400}>
          Death is the negation of existence for the living being, nothing is
          not something, something must be the standard, not the negation of
          something.
        </Txt>
        <Txt textWrap maxWidth={1400}>
          Just as ignorance is not the standard of knowledge, death is not the
          standard of life.
        </Txt>
      </ArrowList>
    </Rect>,
  );

  yield* title().text(
    "death cannot act as the standard of value".toUpperCase(),
    1,
  );
  yield* list().next("value is blah");
  yield* list().next("death negation of existence");
  yield* list().next("ignorance not the standard of knowledge");
  yield* list().hideAll("out", fadeout(title));

  // For the same reason, death cannot act as a standard of value. Value is that which man acts to gain and/or keep---you cannot gain or keep death. Death is the negation of existence for the living being, nothing is not something, something must be the standard, not the negation of something. So just as ignorance is not the standard of knowledge, death is not the standard of life.

  const alternatives = createRefArray<Txt>();

  view.add(
    <Rect
      layout
      alignItems="center"
      gap={64}
      width={1920}
      justifyContent="center"
      direction="column"
    >
      <Txt
        scale={0}
        ref={alternatives}
        textAlign="center"
        fontSize={80}
        textWrap
        fill="white"
      >
        Commit aggression.
      </Txt>
      <Txt
        scale={0}
        ref={alternatives}
        glow
        fill={colors.red500}
        fontFamily="cubano"
      >
        OR
      </Txt>
      <Txt
        scale={0}
        ref={alternatives}
        textAlign="center"
        fontSize={80}
        textWrap
        fill="white"
      >
        Die.
      </Txt>
    </Rect>,
  );

  yield* sequence(0.1, ...alternatives.map((x) => popin(() => x)));
  yield* after(
    "death as an action",
    all(
      alternatives[2].fill(colors.red500, 1),
      alternatives[2].glow(0).glow(1, 1),
      flash((() => alternatives[2]) as Reference<Txt>, colors.red500),
    ),
  );

  yield* after(
    "alternatives out",
    sequence(0.1, ...alternatives.map((x) => popout(() => x))),
  );

  list().remove();
  const blah = createRef<Txt>();
  view.add(
    <ArrowList ref={list}>
      <Txt ref={blah} textWrap maxWidth={1400}>
        Ethics guides man on what <Txt.i>actions</Txt.i> he should take{" "}
        <Txt.i>given the context of his life as an integrated whole</Txt.i>.
      </Txt>
      <Txt textWrap maxWidth={1400}>
        It tells him that given he has a certain nature, certain actions are
        proper to him.
      </Txt>
      <Txt textWrap maxWidth={1400}>
        Death is not an action, it is the end of action.
      </Txt>
    </ArrowList>,
  );

  yield* list().next();
  yield* list().next("certain nature");
  yield* list().next("death not an action");
  yield* after("this framing", flash(blah));
  yield* list().hideAll("out again");

  // In these scenarios we are presented with two choices: either commit aggression against someone, or die. They treat "death" as if it is an action one can take. It is not. Ethics guides man on what /actions/ he should take /given the context of his life as an integrated whole/. It tells man that given he has a certain nature, certain actions are proper to him. Death is not an action. It is the end of action. We have again the reification of a zero.

  // This framing of ethics as guiding man on what to do given the context of his life leads us to our third problem with the framing given by the NAP-exceptionists.
});
