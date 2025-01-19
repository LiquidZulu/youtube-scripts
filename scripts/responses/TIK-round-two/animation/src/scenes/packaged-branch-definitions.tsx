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

// Metaphysics isn't "what is there, and also
// what is the world stuff?," epistemology isn't
// "how do I know and also why are the senses
// invalid?," and ethics isn't "what should I
// do about it, and what are therefore my duties?"
// So then why on Earth should one accept such
// sloppy grafting on of a specific theory in
// Politics--that there should be a government--
// to the broader abstraction of politics itself?
// Say, I think theres a term for doing that. The
// fallacy of making cold abstractions? Something
// like that.

export default makeScene2D(function* (view) {
  view.fill("#030014");

  const list = createRef<ArrowList>();
  view.add(
    <ArrowList ref={list}>
      <Txt>
        <Txt.b glow fill={colors.red500}>
          Metaphysics
        </Txt.b>{" "}
        isn't: what is there, and also what is the world stuff?
      </Txt>
      <Txt>
        <Txt.b glow fill={colors.amber500}>
          Epistemology
        </Txt.b>{" "}
        isn't: how do I know, and also why are the senses invalid?
      </Txt>
      <Txt>
        <Txt.b glow fill={colors.lime500}>
          Ethics
        </Txt.b>{" "}
        isn't: what should I do about it, and what are therefore my duties?
      </Txt>
      <Txt>
        Why is{" "}
        <Txt.b glow fill={colors.sky500}>
          politics
        </Txt.b>
        : how should governments be run?
      </Txt>
    </ArrowList>,
  );

  yield* list().next("metaphysics");
  yield* list().next("epistemology");
  yield* list().next("ethics");
  yield* list().next("politics");
  yield* list().hideAll("out");
});
