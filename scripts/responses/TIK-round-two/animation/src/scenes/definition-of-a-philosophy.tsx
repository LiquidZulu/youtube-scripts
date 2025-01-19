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
import { McasTxt as Txt, popin, popout, fadein, fadeout } from "mcas";
import * as colors from "mcas/colors";
import { ArrowList } from "mcas/lib";

export default makeScene2D(function* (view) {
  view.fill(colors.bg);

  const list = createRef<ArrowList>();
  view.add(
    <ArrowList ref={list}>
      <Txt textWrap maxWidth={1500}>
        The definition of a <Txt.i>philosophy</Txt.i> identifies what is
        distinctive to that philosophy, <Txt.i>and thus</Txt.i> how it
        approaches each of the branches.
      </Txt>
      <Txt textWrap maxWidth={1500}>
        No abstraction can be properly defined by listing off each and every
        particular to which it applies.
      </Txt>
      <Txt textWrap maxWidth={1500}>
        Objectivism is a philosophy; philosophy is an abstraction beyond the
        particular branches; so Objectivism cannot be defined in terms of
        listing off what it says on each branch.
      </Txt>
    </ArrowList>,
  );

  yield* list().next();
  yield* list().next("no abstraction");
  yield* list().next("objectivism is a philosophy");

  yield* waitUntil("end");
  yield* list().hideAll();

  // When we are looking for a definition of a /philosophy/, we are looking for what is distinctive to that philosophy, and thus how it approaches each of the branches. No abstraction can be properly defined by listing off each and every particular to which it applies---that is the nominalist approach to definition. So Objectivism as a philosophy which is the broader abstraction beyond each individual branch is not defined in terms of listing off what it says on each branch.
});
