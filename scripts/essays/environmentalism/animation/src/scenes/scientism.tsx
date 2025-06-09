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
import { after, ArrowList, flash } from "mcas/lib";

export default makeScene2D(function* (view) {
  view.fill("000001");
  const title = createRef<Txt>();
  const scientism = createRef<Txt>();
  const andEnvironmentalism = createRef<Txt>();
  view.add(
    <Txt
      fontSize={70}
      glow
      fontFamily="Oswald"
      fill={colors.purple500}
      ref={title}
    />,
  );

  yield* all(
    view.fill(colors.bgpurple, 2),
    title().text("scientism and environmentalism".toUpperCase(), 1),
  );

  title().text("");
  title().add(
    <Txt>
      <Txt ref={scientism}>SCIENTISM</Txt>{" "}
      <Txt ref={andEnvironmentalism}>AND ENVIRONMENTALISM</Txt>
    </Txt>,
  );

  yield* after("indicate scientism", flash(scientism));

  // It is in the environmentalist's bundling together of the facts of the matter (this factory is pumping out pollution) and the evaluation of those facts (we should therefore ban factories) that provides us a view of the type of philosophy at play here. Namely, /scientism/.

  const list = createRef<ArrowList>();

  view.add(
    <ArrowList position={[0, 100]} ref={list} rayColor={colors.purple500}>
      <Txt maxWidth={1600} textWrap>
        A "bundled philosophy" is any philosophy which provides you with your{" "}
        <Txt.b fill={colors.red500}>metaphysics</Txt.b> (what is there?),{" "}
        <Txt.b fill={colors.teal500}>epistemology</Txt.b> (how do I know?), and{" "}
        <Txt.b fill={colors.yellow500}>ethics</Txt.b> (what should I do about
        it?), all in one neat bundle with the same answer to each.
      </Txt>
      <Txt>
        <Txt.b fill={colors.red500}>What is there?</Txt.b> The Science™ is
        there!
      </Txt>
      <Txt>
        <Txt.b fill={colors.teal500}>How do I know?</Txt.b> The Science™ of
        course!
      </Txt>
      <Txt>
        <Txt.b fill={colors.yellow500}>What should I do about it?</Txt.b>{" "}
        Whatever The Science™ says is proper.
      </Txt>
    </ArrowList>,
  );

  yield* after(
    "bundled",
    all(
      title().position([0, -350], 1),
      andEnvironmentalism().text("as a bundled philosophy:".toUpperCase(), 0.5),
    ),
  );
  yield* list().next("bundled exp");
  yield* list().next("what is there");
  yield* list().next("how do I know");
  yield* list().next("what should I do about it");

  yield* list().showAll();

  // Scientism is a modern form of the "bundled philosophies" of old---a bundled philosophy is any philosophy which provides you with your metaphysics (what is there?), epistemology (how do I know?), and ethics (what should I do about it?), all in one neat bundle with the same answer to each. On scientism: what is there? The Science™ is there. How do I know? The Science™ of course! What should I do about it? Whatever The Science™ says is proper.

  // This "The Science™" bundle may then be treated as a primary, borrowed from person to person, and at no point does it need to be critically examined. "Critical examination? That’s the job of The Science™, not me! My place is to trust, not discover."

  yield* list().hideAll(
    "list out",
    all(
      title().text("the error of scientism:".toUpperCase(), 1),
      title().position([0, -400], 1),
    ),
  );
  list().remove();
  view.add(
    <ArrowList
      fontFamily="sans"
      position={[0, 100]}
      ref={list}
      rayColor={colors.purple500}
    >
      <Txt maxWidth={1600} textWrap>
        Any science is a <Txt.i>specialised</Txt.i> field of study---it is
        answering the question "<Txt.i>what do I know?</Txt.i>" which relies on
        the prior question of "<Txt.i>how do I know?</Txt.i>."
      </Txt>
      <Txt maxWidth={1600} textWrap>
        Any science relies on a vast body of antecedent philosophy---this
        philosophy cannot be destroyed and replaced by the specialised knowledge
        that is built up from it.
      </Txt>
      <Txt maxWidth={1600} textWrap>
        There is no The Science™ that can stand on its own or be "trusted."
        Calls to "trust the science" are calls to trusting the scientists.
      </Txt>
      <Txt maxWidth={1600} textWrap>
        The Chinese trusted that The Science™ would be able to maintain control
        over lab-grown chimera-viruses, and when it failed to do so we were told
        that the problem was not trusting The Science™ enough!
      </Txt>
    </ArrowList>,
  );

  yield* list().next("specialised field");
  yield* list().next("antecedent philosophy");
  yield* list().next("cannot stand on its own");
  yield* list().next("ccpvirus");
  yield* list().hideAll("out", title().text("", 1));

  // Of course, any science is a /specialised/ field of study---it is answering the question "/what do I know?/" which relies on the prior question of "/how do I know?/." For a man to begin any scientific endeavour he relies on a vast body of antecedent philosophy---this philosophy cannot be destroyed and replaced by the specialised knowledge that is built up from it. There is no The Science™ that can stand on its own or be "trusted"---in actual fact, calls to "trust the science" amount to trusting the scientists. The Chinese trusted that The Science™ would be able to maintain control over lab-grown chimera-viruses and when it failed to do so we were told that the problem was not trusting The Science™ enough! "We need to trust The Science™ now more than ever---you want freedom? How very Unscientific™ of you---didn’t you know that the top Experts™ have already determined that freedom is a bourgeois concept that has no application to practical reality? The Science™ has spoken and you must obey---for I am Law™."
});
