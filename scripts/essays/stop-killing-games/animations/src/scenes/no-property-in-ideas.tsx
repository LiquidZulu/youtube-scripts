import { makeScene2D, Rect, Ray, Img } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
} from "@motion-canvas/core";
import {
  McasTxt as Txt,
  popin,
  popout,
  fadein,
  fadeout,
  sceneVar,
  ArrowList,
} from "mcas";
import * as colors from "mcas/colors";

export default makeScene2D(function* (view) {
  view.fill(colors.slate950);
  const skgblue = sceneVar("skgblue");

  // That is, the concept of "property" simply does not arise in the realm of ideas, only in the realm of scarce goods. Really what these IP monopolies are are government-enforced easements over the property of everybody else. They are a piece of legislative fiat that says because you came up with a certain type of idea you now have a partial ownership in the property of everybody else. That you get to tell me what I can do with my own property. That's not right at all.

  const l = createRef<ArrowList>();

  view.add(
    <ArrowList ref={l}>
      <Txt textWrap maxWidth={1600}>
        The concept of "property" does not arise in the realm of ideas, only in
        the realm of scarce goods.
      </Txt>
      <Txt textWrap maxWidth={1600}>
        IP monopolies are government-enforced easements over the property of
        everybody else.
      </Txt>
      <Txt textWrap maxWidth={1600}>
        They are legislative fiat that says because you came up with an idea you
        now have partial ownership of the property of everybody else.
      </Txt>
    </ArrowList>,
  );

  yield* l().next("concept property");
  yield* l().next("monopolies are");
  yield* l().next("legislative fiat");
  yield* waitFor(16);
});
