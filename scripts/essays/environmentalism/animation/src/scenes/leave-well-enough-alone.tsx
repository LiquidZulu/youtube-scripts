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
  ArrowList,
} from "mcas";
import * as colors from "mcas/colors";

export default makeScene2D(function* (view) {
  view.fill(colors.bggreen);

  const title = createRef<Txt>();
  const list = createRef<ArrowList>();

  view.add(
    <Rect layout direction="column" gap={64} alignItems="center">
      <Txt ref={title} fontFamily="oswald" fontSize={64} />
      <ArrowList ref={list}>
        <Txt textWrap maxWidth={1400}>
          treats "rewards" as an arbitrary whim of the policymaker, rather than
          a law of nature;
        </Txt>
        <Txt textWrap maxWidth={1400}>
          if we just decide to reward leaving nature alone, that we then can.
        </Txt>
        <Txt textWrap maxWidth={1400}>
          But who is to produce and provide the rewards for non-production and
          non-provision?
        </Txt>
      </ArrowList>
    </Rect>,
  );

  yield* list().next(
    null,
    null,
    all(
      fadein(title),
      title().text(`GRANT REWARDS TO THOSE WHO "LEAVE WELL ENOUGH ALONE":`, 1),
    ),
  );

  yield* list().next("just reward leaving nature alone, bro!");
  yield* list().next("who pays for it?");
  yield* list().hideAll("list out", fadeout(title));

  // The environmentalists cry that we should preserve nature, that capitalism is evil because it yields rewards for people who exploit[fn:1] it, and that instead we should grant rewards to those who "leave well enough alone"---"rewards" are here treated as if they were the arbitrary whim of the policymaker, rather than a law of nature; that if we just decide to reward leaving nature alone that we then can. But who is to pay for this? Who is to produce and provide the rewards for non-production and non-provision?
});
